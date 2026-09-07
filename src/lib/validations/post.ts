import { z } from "zod"

export const postStatuses = ["draft", "published"] as const

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Judul minimal 3 karakter")
    .max(120, "Judul maksimal 120 karakter"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(120, "Slug maksimal 120 karakter")
    .optional()
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug hanya boleh huruf kecil, angka, dan strip",
    }),
  excerpt: z
    .string()
    .trim()
    .max(200, "Ringkasan maksimal 200 karakter")
    .optional(),
  tags: z
    .string()
    .trim()
    .max(500, "Tags terlalu panjang")
    .optional()
    .transform((val) =>
      !val ? [] : val.split(",").map((t) => t.trim()).filter(Boolean),
    )
    .refine((val) => val.length <= 10, { message: "Maksimal 10 tags" })
    .refine((val) => val.every((t) => t.length <= 40), {
      message: "Setiap tag maksimal 40 karakter",
    }),
  status: z.enum(postStatuses, { message: "Status harus draft atau published" }),
  featured: z
    // Checkbox yang tidak dicentang tidak dikirim browser (null),
    // jadi null harus diterima dan dianggap false.
    .union([z.string(), z.boolean(), z.null()])
    .optional()
    .transform((val) => val === true || val === "on" || val === "true"),
  content_json: z
    .string()
    .trim()
    .min(1, "Konten wajib diisi")
    .max(100000, "Konten terlalu panjang")
    .refine((val) => {
      try {
        JSON.parse(val)
        return true
      } catch {
        return false
      }
    }, { message: "Format konten tidak valid" }),
})

export type PostFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
