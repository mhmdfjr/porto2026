import { z } from "zod"

export const featureSchema = z.object({
  feature: z
    .string()
    .trim()
    .min(3, "Nama feature minimal 3 karakter")
    .max(80, "Nama feature maksimal 80 karakter"),
  description: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),
})

export type FeatureFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
