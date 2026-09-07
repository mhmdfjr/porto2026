"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { workSchema, type WorkFormState } from "@/lib/validations/work"
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

const FOLDER = storageConfig.folders.works

function validationFail(errors: Record<string, string[]>): WorkFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
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

    const { error } = await supabase.from("works").insert({
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location,
      start: parsed.data.start,
      end: parsed.data.end || null,
      image: imageUrl,
    })

    if (error) {
      // Rollback orphan upload when DB insert fails
      await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      throw error
    }

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil ditambahkan" }
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
    return validationFail(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    )
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data pengalaman kerja")

    // Source of truth for the current image is the DB, not the client.
    const { data: current, error: fetchError } = await supabase
      .from("works")
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
      .from("works")
      .update({
        company: parsed.data.company,
        role: parsed.data.role,
        location: parsed.data.location,
        start: parsed.data.start,
        end: parsed.data.end || null,
        image: imageUrl,
      })
      .eq("id", recordId)

    if (error) {
      // Rollback the new upload if it is not referenced anymore
      if (hasNewFile && imageUrl !== current.image) {
        await removeStoragePaths(supabase, [extractStoragePath(imageUrl)])
      }
      throw error
    }

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil diperbarui" }
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

export async function deleteWork(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Data pengalaman kerja")

    const { data: current, error: fetchError } = await supabase
      .from("works")
      .select("image")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Data tidak ditemukan")

    if (current.image) {
      await removeStoragePaths(supabase, [extractStoragePath(current.image)])
    }

    const { error } = await supabase.from("works").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/works")
    return { success: true, message: "Data pengalaman kerja berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus data"),
    }
  }
}
