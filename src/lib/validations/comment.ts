import { z } from "zod"

export const commentTargets = ["post", "project"] as const

export const commentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  message: z
    .string()
    .trim()
    .min(3, "Comment must be at least 3 characters")
    .max(1000, "Comment must be at most 1000 characters"),
})

export type CommentFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
