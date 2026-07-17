import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Nama kontak minimal 2 karakter"),
  url: z
    .string()
    .min(1, "URL wajib diisi")
    .refine((val) => /^https?:\/\/.+/.test(val) || /^mailto:.+/.test(val), {
      message: "URL harus diawali http://, https://, atau mailto:",
    }),
  icon: z.string().min(1, "Nama icon wajib diisi"),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}