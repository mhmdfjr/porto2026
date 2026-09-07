"use server"

import { revalidatePath } from "next/cache"
import sanitizeHtml from "sanitize-html"
import { createClient } from "@/lib/supabase/server"
import {
  postSchema,
  slugifyTitle,
  type PostFormState,
} from "@/lib/validations/post"
import { storageConfig } from "@/lib/config"
import {
  uploadImage,
  extractStoragePath,
  removeStoragePaths,
  UploadValidationError,
} from "@/lib/storage"
import {
  requireUser,
  validateId,
  toUserMessage,
  FriendlyError,
} from "@/lib/actions-helpers"

const FOLDER = storageConfig.folders.posts

function validationFail(errors: Record<string, string[]>): PostFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
}

function sanitizeContent(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "h1", "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
      "strong", "em", "s", "code", "pre", "a", "img", "hr", "br",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  })
}

function readingMinutes(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  const words = text ? text.split(" ").length : 0
  return Math.min(60, Math.max(1, Math.ceil(words / 200)))
}

type ParsedPost = {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  status: "draft" | "published"
  featured: boolean
  contentJson: string
  contentHtml: string
}

function parseForm(formData: FormData): ParsedPost | PostFormState {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    tags: formData.get("tags"),
    status: formData.get("status"),
    featured: formData.get("featured"),
    content_json: formData.get("content_json"),
  })

  if (!parsed.success) {
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  const rawHtml = formData.get("content_html")
  const contentHtml = sanitizeContent(
    typeof rawHtml === "string" ? rawHtml.slice(0, 200000) : "",
  )

  let slug = (parsed.data.slug || "").trim()
  if (!slug) slug = slugifyTitle(parsed.data.title)
  if (!slug) {
    return validationFail({ slug: ["Slug tidak valid, isi manual"] })
  }

  let excerpt = (parsed.data.excerpt || "").trim()
  if (!excerpt) {
    const text = contentHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    excerpt = text.slice(0, 200)
  }

  return {
    title: parsed.data.title,
    slug,
    excerpt,
    tags: parsed.data.tags,
    status: parsed.data.status,
    featured: parsed.data.featured,
    contentJson: parsed.data.content_json,
    contentHtml,
  }
}

export async function createPost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const input = parseForm(formData)
  if ("success" in input) return input

  const file = formData.get("cover") as File | null
  const hasFile = file !== null && file.size > 0

  const supabase = await createClient()

  try {
    await requireUser(supabase)

    let coverUrl: string | null = null
    if (hasFile) {
      coverUrl = await uploadImage(supabase, file as File, FOLDER)
    }

    const { error } = await supabase.from("posts").insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content_json: JSON.parse(input.contentJson),
      content_html: input.contentHtml,
      cover_image: coverUrl,
      tags: input.tags,
      status: input.status,
      featured: input.featured,
      reading_minutes: readingMinutes(input.contentHtml),
      published_at: input.status === "published" ? new Date().toISOString() : null,
    })

    if (error) {
      if (coverUrl) {
        await removeStoragePaths(supabase, [extractStoragePath(coverUrl)])
      }
      if (error.code === "23505") {
        throw new FriendlyError("Slug sudah dipakai artikel lain")
      }
      throw error
    }

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    return { success: true, message: "Artikel berhasil ditambahkan" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ cover: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal menambahkan artikel"),
    }
  }
}

export async function updatePost(
  id: number,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const input = parseForm(formData)
  if ("success" in input) return input

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Artikel")

    const { data: current, error: fetchError } = await supabase
      .from("posts")
      .select("cover_image, published_at, status")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Artikel tidak ditemukan")

    const removeCover = formData.get("remove_cover") === "on"
    const file = formData.get("cover") as File | null
    const hasNewFile = file !== null && file.size > 0

    let coverUrl: string | null = current.cover_image as string | null
    if (removeCover) coverUrl = null
    if (hasNewFile) {
      coverUrl = await uploadImage(supabase, file as File, FOLDER)
      if (current.cover_image) {
        await removeStoragePaths(supabase, [
          extractStoragePath(current.cover_image as string),
        ])
      }
    }

    const publishedAt =
      input.status === "published"
        ? ((current.published_at as string | null) ??
          new Date().toISOString())
        : null

    const { error } = await supabase
      .from("posts")
      .update({
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt,
        content_json: JSON.parse(input.contentJson),
        content_html: input.contentHtml,
        cover_image: coverUrl,
        tags: input.tags,
        status: input.status,
        featured: input.featured,
        reading_minutes: readingMinutes(input.contentHtml),
        published_at: publishedAt,
      })
      .eq("id", recordId)

    if (error) {
      if (hasNewFile && coverUrl !== current.cover_image) {
        await removeStoragePaths(supabase, [extractStoragePath(coverUrl ?? "")])
      }
      if (error.code === "23505") {
        throw new FriendlyError("Slug sudah dipakai artikel lain")
      }
      throw error
    }

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    revalidatePath(`/blog/${input.slug}`)
    return { success: true, message: "Artikel berhasil diperbarui" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ cover: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal memperbarui artikel"),
    }
  }
}

export async function deletePost(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Artikel")

    const { data: current, error: fetchError } = await supabase
      .from("posts")
      .select("cover_image")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Artikel tidak ditemukan")

    if (current.cover_image) {
      await removeStoragePaths(supabase, [
        extractStoragePath(current.cover_image as string),
      ])
    }

    const { error } = await supabase.from("posts").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    return { success: true, message: "Artikel berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus artikel"),
    }
  }
}
