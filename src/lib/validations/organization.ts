import { z } from "zod"

const stringList = (requiredMessage: string, itemLabel: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .max(500, `${itemLabel} terlalu panjang`)
    .transform((val) => val.split(",").map((v) => v.trim()).filter(Boolean))
    .refine((val) => val.length > 0, { message: requiredMessage })
    .refine((val) => val.length <= 20, {
      message: `Maksimal 20 ${itemLabel.toLowerCase()}`,
    })
    .refine((val) => val.every((v) => v.length <= 60), {
      message: `Setiap ${itemLabel.toLowerCase()} maksimal 60 karakter`,
    })

export const organizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama organisasi minimal 2 karakter")
    .max(120, "Nama organisasi maksimal 120 karakter"),
  location: z
    .string()
    .trim()
    .min(2, "Lokasi minimal 2 karakter")
    .max(120, "Lokasi maksimal 120 karakter"),
  year: stringList("Tahun wajib diisi, pisahkan dengan koma", "Tahun"),
  role: stringList("Role wajib diisi, pisahkan dengan koma", "Role"),
})

export type OrganizationFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
