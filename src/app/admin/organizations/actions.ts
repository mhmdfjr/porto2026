"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { organizationSchema, type OrganizationFormState } from "@/lib/validations/organization"

const BUCKET = "porto"
const FOLDER = "Organizations"

async function uploadImage(supabase: any, file: File) {
  const ext = file.name.split(".").pop()
  const path = `${FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) throw new Error(`Gagal upload gambar: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl as string
}

function removeImagePath(url: string) {
  return url.split(`${BUCKET}/`)[1]
}

export async function createOrganization(
  _prevState: OrganizationFormState,
  formData: FormData
): Promise<OrganizationFormState> {
  const parsed = organizationSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    year: formData.get("year"),
    role: formData.get("role"),
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

    const { error } = await supabase.from("organizations").insert({
      name: parsed.data.name,
      location: parsed.data.location,
      year: parsed.data.year,
      role: parsed.data.role,
      image: imageUrl,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menambahkan data",
    }
  }
}

export async function updateOrganization(
  id: number,
  existingImage: string,
  _prevState: OrganizationFormState,
  formData: FormData
): Promise<OrganizationFormState> {
  const parsed = organizationSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    year: formData.get("year"),
    role: formData.get("role"),
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

      if (existingImage) {
        const oldPath = removeImagePath(existingImage)
        if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath])
      }
    }

    const { error } = await supabase
      .from("organizations")
      .update({
        name: parsed.data.name,
        location: parsed.data.location,
        year: parsed.data.year,
        role: parsed.data.role,
        image: imageUrl,
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal memperbarui data",
    }
  }
}

export async function deleteOrganization(id: number, imageUrl: string) {
  const supabase = await createClient()

  try {
    if (imageUrl) {
      const path = removeImagePath(imageUrl)
      if (path) await supabase.storage.from(BUCKET).remove([path])
    }

    const { error } = await supabase.from("organizations").delete().eq("id", id)
    if (error) throw new Error(error.message)

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menghapus data",
    }
  }
}