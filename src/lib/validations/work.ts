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

export const workSchema = z
  .object({
    company: z
      .string()
      .trim()
      .min(2, "Nama perusahaan minimal 2 karakter")
      .max(120, "Nama perusahaan maksimal 120 karakter"),
    role: z
      .string()
      .trim()
      .min(2, "Posisi/role minimal 2 karakter")
      .max(120, "Posisi/role maksimal 120 karakter"),
    location: z
      .string()
      .trim()
      .min(2, "Lokasi wajib diisi")
      .max(120, "Lokasi maksimal 120 karakter"),
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

export type WorkFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
