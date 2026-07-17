"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { contactSchema, type ContactFormState } from "@/lib/validations/contact"

export async function createContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
    icon: formData.get("icon"),
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
    const { error } = await supabase.from("contacts").insert({
      name: parsed.data.name,
      url: parsed.data.url,
      icon: parsed.data.icon,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/admin/contacts")
    return { success: true, message: "Kontak berhasil ditambahkan" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menambahkan kontak",
    }
  }
}

export async function updateContact(
  id: number,
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
    icon: formData.get("icon"),
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
      .from("contacts")
      .update({
        name: parsed.data.name,
        url: parsed.data.url,
        icon: parsed.data.icon,
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/admin/contacts")
    return { success: true, message: "Kontak berhasil diperbarui" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal memperbarui kontak",
    }
  }
}

export async function deleteContact(id: number) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("contacts").delete().eq("id", id)
    if (error) throw new Error(error.message)

    revalidatePath("/admin/contacts")
    return { success: true, message: "Kontak berhasil dihapus" }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menghapus kontak",
    }
  }
}