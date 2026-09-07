import { z } from "zod"

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama skill minimal 2 karakter")
    .max(60, "Nama skill maksimal 60 karakter"),
})

export type SkillFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
