import { z } from "zod"

export const workSchema = z
  .object({
    company: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
    role: z.string().min(2, "Posisi/role minimal 2 karakter"),
    location: z.string().min(2, "Lokasi wajib diisi"),
    start: z.string().min(1, "Tanggal mulai wajib diisi"),
    end: z.string().optional(),
  })
  .refine(
    (data) => !data.end || new Date(data.end) >= new Date(data.start),
    {
      message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
      path: ["end"],
    }
  )

export type WorkFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}