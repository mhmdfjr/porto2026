"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { organizationSchema, type OrganizationFormState } from "@/lib/validations/organization"
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

const FOLDER = storageConfig.folders.organizations

function validationFail(errors: Record<string, string[]>): OrganizationFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
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
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  const file = formData.get("image") as File | null

  if (!file || file.size === 0) {
    return validationFail({ image: ["Gambar wajib diunggah"] })
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const imageUrl = await uploadImage(supabase, file, FOLDER)

    const { error } = await supabase.from("organizations").insert({
      name: parsed.data.name,
      location: parsed.data.location,
      year: parsed.data.year,
      role: parsed.data.role,
      image: imageUrl,
    })

    if (error) {
      await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      throw error
    }

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil ditambahkan" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ image: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal menambahkan data"),
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
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data organisasi")

    const { data: current, error: fetchError } = await supabase
      .from("organizations")
      .select("image")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Data tidak ditemukan")

    const trustedExisting =
      existingImage && existingImage === current.image ? existingImage : ""

    const file = formData.get("image") as File | null
    const hasNewFile = file !== null && file.size > 0

    if (!hasNewFile && !trustedExisting) {
      return validationFail({ image: ["Gambar wajib diunggah"] })
    }

    let imageUrl = trustedExisting

    if (hasNewFile) {
      imageUrl = await uploadImage(supabase, file as File, FOLDER)

      if (current.image && current.image !== imageUrl) {
        await removeStoragePaths(supabase, [
          extractStoragePath(current.image),
        ])
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
      .eq("id", recordId)

    if (error) {
      if (hasNewFile && imageUrl !== current.image) {
        await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      }
      throw error
    }

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil diperbarui" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ image: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal memperbarui data"),
    }
  }
}

export async function deleteOrganization(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data organisasi")

    const { data: current, error: fetchError } = await supabase
      .from("organizations")
      .select("image")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Data tidak ditemukan")

    if (current.image) {
      await removeStoragePaths(supabase, [extractStoragePath(current.image)])
    }

    const { error } = await supabase.from("organizations").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/organizations")
    return { success: true, message: "Data organisasi berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus data"),
    }
  }
}
