"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { featureSchema, type FeatureFormState } from "@/lib/validations/feature"
import {
  requireUser,
  validateId,
  toUserMessage,
} from "@/lib/actions-helpers"

export async function createFeature(
  _prevState: FeatureFormState,
  formData: FormData
): Promise<FeatureFormState> {
  const parsed = featureSchema.safeParse({
    feature: formData.get("feature"),
    description: formData.get("description"),
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

    const { error } = await supabase.from("features").insert({
      feature: parsed.data.feature,
      description: parsed.data.description,
    })

    if (error) throw error

    revalidatePath("/admin/features")
    revalidatePath("/")
    return { success: true, message: "Feature berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menambahkan feature"),
    }
  }
}

export async function updateFeature(
  id: number,
  _prevState: FeatureFormState,
  formData: FormData
): Promise<FeatureFormState> {
  const parsed = featureSchema.safeParse({
    feature: formData.get("feature"),
    description: formData.get("description"),
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
    const recordId = validateId(id, "Feature")

    const { error } = await supabase
      .from("features")
      .update({
        feature: parsed.data.feature,
        description: parsed.data.description,
      })
      .eq("id", recordId)

    if (error) throw error

    revalidatePath("/admin/features")
    revalidatePath("/")
    return { success: true, message: "Feature berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal memperbarui feature"),
    }
  }
}

export async function deleteFeature(id: number) {
  const supabase = await createClient()

  try {
    await requireUser(supabase)
    const recordId = validateId(id, "Feature")

    const { error } = await supabase.from("features").delete().eq("id", recordId)
    if (error) throw error

    revalidatePath("/admin/features")
    revalidatePath("/")
    return { success: true, message: "Feature berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus feature"),
    }
  }
}
