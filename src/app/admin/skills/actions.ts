"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { skillSchema, type SkillFormState } from "@/lib/validations/skill"
import {
  requireUser,
  validateId,
  toUserMessage,
  FriendlyError,
} from "@/lib/actions-helpers"

function uniqueMessage(): FriendlyError {
  return new FriendlyError("Skill dengan nama tersebut sudah ada")
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

    const { error } = await supabase.from("skills").insert({
      name: parsed.data.name,
    })

    if (error) {
      if (error.code === "23505") throw uniqueMessage()
      throw error
    }

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil ditambahkan" }
  } catch (err) {
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

    const { error } = await supabase
      .from("skills")
      .update({ name: parsed.data.name })
      .eq("id", recordId)

    if (error) {
      if (error.code === "23505") throw uniqueMessage()
      throw error
    }

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil diperbarui" }
  } catch (err) {
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

    const { error } = await supabase.from("skills").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus skill"),
    }
  }
}
