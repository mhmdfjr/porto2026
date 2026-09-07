"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { educationSchema, type EducationFormState } from "@/lib/validations/education"
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

const FOLDER = storageConfig.folders.educations

function validationFail(errors: Record<string, string[]>): EducationFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
}

export async function createEducation(
  _prevState: EducationFormState,
  formData: FormData
): Promise<EducationFormState> {
  const parsed = educationSchema.safeParse({
    name: formData.get("name"),
    major: formData.get("major"),
    location: formData.get("location") || undefined,
    start: formData.get("start"),
    end: formData.get("end") || undefined,
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

    const { error } = await supabase.from("educations").insert({
      name: parsed.data.name,
      major: parsed.data.major,
      location: parsed.data.location || null,
      start: parsed.data.start,
      end: parsed.data.end || null,
      image: imageUrl,
    })

    if (error) {
      await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      throw error
    }

    revalidatePath("/admin/educations")
    return { success: true, message: "Data pendidikan berhasil ditambahkan" }
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

export async function updateEducation(
  id: number,
  existingImage: string,
  _prevState: EducationFormState,
  formData: FormData
): Promise<EducationFormState> {
  const parsed = educationSchema.safeParse({
    name: formData.get("name"),
    major: formData.get("major"),
    location: formData.get("location") || undefined,
    start: formData.get("start"),
    end: formData.get("end") || undefined,
  })

  if (!parsed.success) {
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data pendidikan")

    const { data: current, error: fetchError } = await supabase
      .from("educations")
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
      .from("educations")
      .update({
        name: parsed.data.name,
        major: parsed.data.major,
        location: parsed.data.location || null,
        start: parsed.data.start,
        end: parsed.data.end || null,
        image: imageUrl,
      })
      .eq("id", recordId)

    if (error) {
      if (hasNewFile && imageUrl !== current.image) {
        await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      }
      throw error
    }

    revalidatePath("/admin/educations")
    return { success: true, message: "Data pendidikan berhasil diperbarui" }
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

export async function deleteEducation(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data pendidikan")

    const { data: current, error: fetchError } = await supabase
      .from("educations")
      .select("image")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Data tidak ditemukan")

    if (current.image) {
      await removeStoragePaths(supabase, [extractStoragePath(current.image)])
    }

    const { error } = await supabase.from("educations").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/educations")
    return { success: true, message: "Data pendidikan berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus data"),
    }
  }
}
