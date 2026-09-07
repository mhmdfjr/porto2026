import { z } from "zod"

function isContactUrl(val: string): boolean {
  if (/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) return true
  try {
    const url = new URL(val)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama kontak minimal 2 karakter")
    .max(80, "Nama kontak maksimal 80 karakter"),
  url: z
    .string()
    .trim()
    .min(1, "URL wajib diisi")
    .max(2048, "URL terlalu panjang")
    .refine(isContactUrl, {
      message: "URL harus diawali http://, https://, atau mailto: yang valid",
    }),
  icon: z
    .string()
    .trim()
    .min(1, "Nama icon wajib diisi")
    .max(60, "Nama icon maksimal 60 karakter"),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
