import { z } from "zod"

export const organizationSchema = z.object({
  name: z.string().min(2, "Nama organisasi minimal 2 karakter"),
  location: z.string().min(2, "Lokasi minimal 2 karakter"),
  year: z
    .string()
    .min(1, "Tahun wajib diisi, pisahkan dengan koma")
    .transform((val) => val.split(",").map((y) => y.trim()).filter(Boolean)),
  role: z
    .string()
    .min(1, "Role wajib diisi, pisahkan dengan koma")
    .transform((val) => val.split(",").map((r) => r.trim()).filter(Boolean)),
})

export type OrganizationFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}