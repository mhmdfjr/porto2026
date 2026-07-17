import { z } from "zod"

export const educationSchema = z
  .object({
    name: z.string().min(2, "Nama institusi minimal 2 karakter"),
    major: z.string().min(2, "Jurusan minimal 2 karakter"),
    location: z.string().optional(),
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

export type EducationFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}