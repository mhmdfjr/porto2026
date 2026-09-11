"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import sanitizeHtml from "sanitize-html"
import { createClient } from "@/lib/supabase/server"
import { commentSchema, type CommentFormState } from "@/lib/validations/comment"
import type { CommentTarget } from "@/lib/supabase"
import { toUserMessage, FriendlyError } from "@/lib/actions-helpers"

// Simple in-memory throttle: max 3 comments per 10 minutes per IP.
const MAX_COMMENTS = 3
const WINDOW_MS = 10 * 60 * 1000
type Entry = { count: number; resetAt: number }
const attempts = new Map<string, Entry>()

function checkThrottle(key: string): boolean {
  const now = Date.now()
  if (attempts.size > 1000) {
    for (const [k, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(k)
    }
  }
  const entry = attempts.get(key)
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_COMMENTS) return false
  entry.count += 1
  return true
}

/** Strip all HTML so comments are always rendered as plain text. */
function sanitizeMessage(dirty: string): string {
  return sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} }).trim()
}

async function clientIp(): Promise<string> {
  const store = await headers()
  const forwarded = store.get("x-forwarded-for")
  return forwarded?.split(",")[0]?.trim() || "unknown"
}

/**
 * Submit an anonymous comment for a blog post or project.
 * New comments are stored as `pending` and only appear
 * after approval in /admin/comments.
 */
export async function createComment(
  targetType: CommentTarget,
  targetSlug: string,
  _prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  // Honeypot: bots fill this hidden field, humans never see it.
  if (typeof formData.get("website") === "string" && formData.get("website")) {
    return { success: true, message: "Thanks! Your comment is awaiting moderation." }
  }

  const cleanSlug = targetSlug.trim().toLowerCase()
  if (
    (targetType !== "post" && targetType !== "project") ||
    !cleanSlug ||
    cleanSlug.length > 120
  ) {
    return { success: false, message: "Invalid comment target." }
  }

  const parsed = commentSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed, please check your input.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const ip = await clientIp()
  if (!checkThrottle(`${ip}:${targetType}:${cleanSlug}`)) {
    return {
      success: false,
      message: "You're commenting too fast. Please try again in a few minutes.",
    }
  }

  const message = sanitizeMessage(parsed.data.message)
  if (message.length < 3) {
    return {
      success: false,
      message: "Validation failed, please check your input.",
      errors: { message: ["Comment must be at least 3 characters"] },
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("comments").insert({
      target_type: targetType,
      target_slug: cleanSlug,
      name: parsed.data.name.trim(),
      message,
      status: "pending",
    })

    if (error) throw error

    revalidatePath(
      targetType === "post" ? `/blog/${cleanSlug}` : `/project/${cleanSlug}`,
    )
    return {
      success: true,
      message: "Thanks! Your comment is awaiting moderation.",
    }
  } catch (err) {
    if (err instanceof FriendlyError) {
      return { success: false, message: err.message }
    }
    return {
      success: false,
      message: toUserMessage(err, "Failed to submit your comment."),
    }
  }
}
