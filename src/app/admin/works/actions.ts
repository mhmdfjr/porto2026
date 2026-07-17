"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { workSchema, type WorkFormState } from "@/lib/validations/work"

const BUCKET = "porto"

async function uploadImage(supabase: any, file: File) {
  const ext = file.name.split(".").pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) throw new Error(`Gagal upload gambar: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl as string
}

function removeImagePath(url: string) {
  return url.split(`${BUCKET}/`)[1]
}

export async function createWork(
  _prevState: WorkFormState,
  formData: FormData
): Promise<WorkFormState> {
  const parsed = workSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location"),
    start: formData.get("start"),
    end: formData.get("end") || undefined,
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const file = formData.get("image") as File

  if (!file || file.size === 0) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: { image: ["Gambar wajib diunggah"] },
    }
  }

  const supabase = await createClient()

  try {
    const imageUrl = await uploadImage(supabase, file)

    const { error } = await supabase.from("works").insert({
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location,
      start: parsed.data.start,
      end: parsed.data.end || null,
      image: imageUrl,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menambahkan data",
    }
  }
}

export async function updateWork(
  id: number,
  existingImage: string,
  _prevState: WorkFormState,
  formData: FormData
): Promise<WorkFormState> {
  const parsed = workSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location"),
    start: formData.get("start"),
    end: formData.get("end") || undefined,
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const file = formData.get("image") as File
  const hasNewFile = file && file.size > 0

  if (!hasNewFile && !existingImage) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: { image: ["Gambar wajib diunggah"] },
    }
  }

  const supabase = await createClient()

  try {
    let imageUrl = existingImage

    if (hasNewFile) {
      imageUrl = await uploadImage(supabase, file)

      // hapus gambar lama supaya storage tidak menumpuk
      if (existingImage) {
        const oldPath = removeImagePath(existingImage)
        if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath])
      }
    }

    const { error } = await supabase
      .from("works")
      .update({
        company: parsed.data.company,
        role: parsed.data.role,
        location: parsed.data.location,
        start: parsed.data.start,
        end: parsed.data.end || null,
        image: imageUrl,
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal memperbarui data",
    }
  }
}

export async function deleteWork(id: number, imageUrl: string) {
  const supabase = await createClient()

  try {
    if (imageUrl) {
      const path = removeImagePath(imageUrl)
      if (path) await supabase.storage.from(BUCKET).remove([path])
    }

    const { error } = await supabase.from("works").delete().eq("id", id)
    if (error) throw new Error(error.message)

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menghapus data",
    }
  }
}