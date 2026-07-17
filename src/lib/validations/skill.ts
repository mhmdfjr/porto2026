import { z } from "zod"

export const skillSchema = z.object({
  name: z.string().min(2, "Nama skill minimal 2 karakter"),
})

export type SkillFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}