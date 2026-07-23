"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { projectSchema, type ProjectFormState } from "@/lib/validations/project"

const BUCKET = "porto"
const FOLDER = "Projects"

async function uploadImages(supabase: any, files: File[]) {
  const urls: string[] = []

  for (const file of files) {
    if (!file || file.size === 0) continue

    const ext = file.name.split(".").pop()
    const path = `${FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage.from(BUCKET).upload(path, file)
    if (error) throw new Error(`Gagal upload gambar: ${error.message}`)

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    urls.push(data.publicUrl)
  }

  return urls
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    techstack: formData.get("techstack"),
    live_url: formData.get("live_url"),
    code_url: formData.get("code_url"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const files = formData.getAll("images") as File[]
  const validFiles = files.filter((f) => f.size > 0)

  if (validFiles.length === 0) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: { images: ["Minimal 1 gambar wajib diunggah"] },
    }
  }

  const supabase = await createClient()

  try {
    const imageUrls = await uploadImages(supabase, validFiles)

    const { error } = await supabase.from("projects").insert({
      name: parsed.data.name,
      description: parsed.data.description,
      techstack: parsed.data.techstack,
      live_url: parsed.data.live_url || null,
      code_url: parsed.data.code_url || null,
      images: imageUrls,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/admin/projects")
    return { success: true, message: "Project berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menambahkan project",
    }
  }
}

export async function updateProject(
  id: number,
  existingImages: string[],
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    techstack: formData.get("techstack"),
    live_url: formData.get("live_url"),
    code_url: formData.get("code_url"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const files = formData.getAll("images") as File[]
  const validFiles = files.filter((f) => f.size > 0)

  if (validFiles.length === 0 && existingImages.length === 0) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: { images: ["Minimal 1 gambar wajib ada"] },
    }
  }

  const supabase = await createClient()

  try {
    const newUrls = await uploadImages(supabase, validFiles)
    const finalImages = [...existingImages, ...newUrls]

    const { error } = await supabase
      .from("projects")
      .update({
        name: parsed.data.name,
        description: parsed.data.description,
        techstack: parsed.data.techstack,
        live_url: parsed.data.live_url || null,
        code_url: parsed.data.code_url || null,
        images: finalImages,
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/admin/projects")
    return { success: true, message: "Project berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal memperbarui project",
    }
  }
}

export async function deleteProject(id: number, imageUrls: string[]) {
  const supabase = await createClient()

  try {
    const paths = imageUrls
      .map((url) => url.split(`${BUCKET}/`)[1])
      .filter(Boolean)

    if (paths.length > 0) {
      await supabase.storage.from(BUCKET).remove(paths)
    }

    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) throw new Error(error.message)

    revalidatePath("/admin/projects")
    return { success: true, message: "Project berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menghapus project",
    }
  }
}