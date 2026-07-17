"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { skillSchema, type SkillFormState } from "@/lib/validations/skill"

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
    const { error } = await supabase.from("skills").insert({
      name: parsed.data.name,
    })

    if (error) {
      // Tangani unique constraint kalau ada (skill dengan nama sama)
      if (error.code === "23505") {
        throw new Error("Skill dengan nama tersebut sudah ada")
      }
      throw new Error(error.message)
    }

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menambahkan skill",
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
    const { error } = await supabase
      .from("skills")
      .update({ name: parsed.data.name })
      .eq("id", id)

    if (error) {
      if (error.code === "23505") {
        throw new Error("Skill dengan nama tersebut sudah ada")
      }
      throw new Error(error.message)
    }

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal memperbarui skill",
    }
  }
}

export async function deleteSkill(id: number) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("skills").delete().eq("id", id)
    if (error) throw new Error(error.message)

    revalidatePath("/admin/skills")
    return { success: true, message: "Skill berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menghapus skill",
    }
  }
}