"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { projectSchema, type ProjectFormState } from "@/lib/validations/project"
import { slugifyTitle } from "@/lib/validations/post"
import { storageConfig } from "@/lib/config"
import {
  uploadImages,
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

const FOLDER = storageConfig.folders.projects

function validationFail(errors: Record<string, string[]>): ProjectFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
}

function parseExistingImages(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string" || raw.length === 0) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((v): v is string => typeof v === "string")
  } catch {
    return []
  }
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    techstack: formData.get("techstack"),
    live_url: formData.get("live_url"),
    code_url: formData.get("code_url"),
  })

  if (!parsed.success) {
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  let slug = (parsed.data.slug || "").trim().toLowerCase()
  if (!slug) slug = slugifyTitle(parsed.data.name)
  if (!slug) {
    return validationFail({ slug: ["Slug tidak valid, isi manual"] })
  }

  const files = formData.getAll("images") as File[]
  const validFiles = files.filter((f) => f && f.size > 0)

  if (validFiles.length === 0) {
    return validationFail({ images: ["Minimal 1 gambar wajib diunggah"] })
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const imageUrls = await uploadImages(supabase, validFiles, FOLDER)

    const { error } = await supabase.from("projects").insert({
      slug,
      name: parsed.data.name,
      description: parsed.data.description,
      techstack: parsed.data.techstack,
      live_url: parsed.data.live_url || null,
      code_url: parsed.data.code_url || null,
      images: imageUrls,
    })

    if (error) {
      await removeStoragePaths(
        supabase,
        imageUrls.map(extractStoragePath),
      )
      if (error.code === "23505") {
        throw new FriendlyError("Slug sudah dipakai project lain")
      }
      throw error
    }

    revalidatePath("/admin/projects")
    revalidatePath("/project")
    revalidatePath(`/project/${slug}`)
    return { success: true, message: "Project berhasil ditambahkan" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ images: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal menambahkan project"),
    }
  }
}

export async function updateProject(
  id: number,
  _clientExistingImages: string[],
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    techstack: formData.get("techstack"),
    live_url: formData.get("live_url"),
    code_url: formData.get("code_url"),
  })

  if (!parsed.success) {
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  let slug = (parsed.data.slug || "").trim().toLowerCase()
  if (!slug) slug = slugifyTitle(parsed.data.name)
  if (!slug) {
    return validationFail({ slug: ["Slug tidak valid, isi manual"] })
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Project")

    const { data: current, error: fetchError } = await supabase
      .from("projects")
      .select("images, slug")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Project tidak ditemukan")

    const dbImages: string[] = Array.isArray(current.images)
      ? current.images.filter((v): v is string => typeof v === "string")
      : []
    const dbSet = new Set(dbImages)

    // Only keep client URLs that actually belong to this record.
    const requested = parseExistingImages(formData.get("existingImages"))
    const trustedExisting = requested.filter((url) => dbSet.has(url))

    const files = formData.getAll("images") as File[]
    const validFiles = files.filter((f) => f && f.size > 0)

    if (validFiles.length === 0 && trustedExisting.length === 0) {
      return validationFail({ images: ["Minimal 1 gambar wajib ada"] })
    }

    const newUrls = await uploadImages(supabase, validFiles, FOLDER)
    const finalImages = [...trustedExisting, ...newUrls]

    const { error } = await supabase
      .from("projects")
      .update({
        slug,
        name: parsed.data.name,
        description: parsed.data.description,
        techstack: parsed.data.techstack,
        live_url: parsed.data.live_url || null,
        code_url: parsed.data.code_url || null,
        images: finalImages,
      })
      .eq("id", recordId)

    if (error) {
      await removeStoragePaths(
        supabase,
        newUrls.map(extractStoragePath),
      )
      if (error.code === "23505") {
        throw new FriendlyError("Slug sudah dipakai project lain")
      }
      throw error
    }

    // Remove images the user dropped in the editor (DB-owned only).
    const removed = dbImages.filter((url) => !trustedExisting.includes(url))
    if (removed.length > 0) {
      await removeStoragePaths(
        supabase,
        removed.map(extractStoragePath),
      )
    }

    revalidatePath("/admin/projects")
    revalidatePath("/project")
    revalidatePath(`/project/${slug}`)
    if (current.slug && current.slug !== slug) {
      revalidatePath(`/project/${current.slug}`)
    }
    return { success: true, message: "Project berhasil diperbarui" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ images: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal memperbarui project"),
    }
  }
}

export async function deleteProject(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Project")

    const { data: current, error: fetchError } = await supabase
      .from("projects")
      .select("images")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Project tidak ditemukan")

    const images: string[] = Array.isArray(current.images)
      ? current.images.filter((v): v is string => typeof v === "string")
      : []

    if (images.length > 0) {
      await removeStoragePaths(
        supabase,
        images.map(extractStoragePath),
      )
    }

    const { error } = await supabase.from("projects").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/projects")
    revalidatePath("/project")
    return { success: true, message: "Project berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus project"),
    }
  }
}
