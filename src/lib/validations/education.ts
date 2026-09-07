import { z } from "zod"

const dateString = (message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(20, "Format tanggal tidak valid")
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Format tanggal tidak valid",
    })

export const educationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Nama institusi minimal 2 karakter")
      .max(120, "Nama institusi maksimal 120 karakter"),
    major: z
      .string()
      .trim()
      .min(2, "Jurusan minimal 2 karakter")
      .max(120, "Jurusan maksimal 120 karakter"),
    location: z
      .string()
      .trim()
      .max(120, "Lokasi maksimal 120 karakter")
      .optional(),
    start: dateString("Tanggal mulai wajib diisi"),
    end: z
      .string()
      .trim()
      .max(20, "Format tanggal tidak valid")
      .optional()
      .refine((val) => !val || !Number.isNaN(Date.parse(val)), {
        message: "Format tanggal tidak valid",
      }),
  })
  .refine(
    (data) => !data.end || Date.parse(data.end) >= Date.parse(data.start),
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
