"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { skillSchema, type SkillFormState } from "@/lib/validations/skill"
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

const FOLDER = storageConfig.folders.skills

function uniqueMessage(): FriendlyError {
  return new FriendlyError("Skill dengan nama tersebut sudah ada")
}

function validationFail(errors: Record<string, string[]>): SkillFormState {
  return {
    success: false,
    message: "Validasi gagal, periksa kembali input kamu",
    errors,
  }
}

export async function createSkill(
  _prevState: SkillFormState,
  formData: FormData
): Promise<SkillFormState> {
  const parsed = skillSchema.safeParse({
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)

    const file = formData.get("logo") as File | null
    let logoUrl: string | null = null
    if (file && file.size > 0) {
      logoUrl = await uploadImage(supabase, file, FOLDER)
    }

    const { error } = await supabase.from("skills").insert({
      name: parsed.data.name,
      logo: logoUrl,
    })

    if (error) {
      if (logoUrl) {
        await removeStoragePaths(supabase, [extractStoragePath(logoUrl)])
      }
      if (error.code === "23505") throw uniqueMessage()
      throw error
    }

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill berhasil ditambahkan" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ logo: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal menambahkan skill"),
    }
  }
}

export async function updateSkill(
  id: number,
  _prevState: SkillFormState,
  formData: FormData
): Promise<SkillFormState> {
  const parsed = skillSchema.safeParse({
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal, periksa kembali input kamu",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Skill")

    const { data: current, error: fetchError } = await supabase
      .from("skills")
      .select("logo")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Skill tidak ditemukan")

    const removeLogo = formData.get("remove_logo") === "on"
    const file = formData.get("logo") as File | null
    const hasNewFile = file !== null && file.size > 0

    let logoUrl: string | null = current.logo as string | null
    if (removeLogo) logoUrl = null
    if (hasNewFile) {
      logoUrl = await uploadImage(supabase, file as File, FOLDER)
      if (current.logo) {
        await removeStoragePaths(supabase, [
          extractStoragePath(current.logo as string),
        ])
      }
    }

    const { error } = await supabase
      .from("skills")
      .update({ name: parsed.data.name, logo: logoUrl })
      .eq("id", recordId)

    if (error) {
      if (hasNewFile && logoUrl !== current.logo) {
        await removeStoragePaths(supabase, [extractStoragePath(logoUrl ?? "")])
      }
      if (error.code === "23505") throw uniqueMessage()
      throw error
    }

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill berhasil diperbarui" }
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return validationFail({ logo: [err.message] })
    }
    return {
      success: false,
      message: toUserMessage(err, "Gagal memperbarui skill"),
    }
  }
}

export async function deleteSkill(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Skill")

    const { data: current, error: fetchError } = await supabase
      .from("skills")
      .select("logo")
      .eq("id", recordId)
      .single()
    if (fetchError || !current) throw new FriendlyError("Skill tidak ditemukan")

    if (current.logo) {
      await removeStoragePaths(supabase, [
        extractStoragePath(current.logo as string),
      ])
    }

    const { error } = await supabase.from("skills").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus skill"),
    }
  }
}
