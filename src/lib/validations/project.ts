import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(3, "Nama project minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  techstack: z
    .string()
    .min(1, "Techstack wajib diisi, pisahkan dengan koma")
    .transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
  live_url: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: "Live URL harus diawali http:// atau https://",
    }),
  code_url: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: "Code URL harus diawali http:// atau https://",
    }),
})

export type ProjectFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}