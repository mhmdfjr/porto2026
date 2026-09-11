import { z } from "zod"

function isHttpUrl(val: string): boolean {
  try {
    const url = new URL(val)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const optionalHttpUrl = (message: string) =>
  z
    .string()
    .trim()
    .max(2048, "URL terlalu panjang")
    .optional()
    .refine((val) => !val || isHttpUrl(val), { message })

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nama project minimal 3 karakter")
    .max(120, "Nama project maksimal 120 karakter"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(120, "Slug maksimal 120 karakter")
    .optional()
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug hanya boleh huruf kecil, angka, dan strip",
    }),
  description: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(5000, "Deskripsi maksimal 5000 karakter"),
  techstack: z
    .string()
    .trim()
    .min(1, "Techstack wajib diisi, pisahkan dengan koma")
    .max(500, "Techstack terlalu panjang")
    .transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean))
    .refine((val) => val.length > 0, {
      message: "Techstack wajib diisi, pisahkan dengan koma",
    })
    .refine((val) => val.length <= 20, {
      message: "Maksimal 20 techstack",
    }),
  live_url: optionalHttpUrl("Live URL harus URL http(s) yang valid"),
  code_url: optionalHttpUrl("Code URL harus URL http(s) yang valid"),
})

export type ProjectFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
