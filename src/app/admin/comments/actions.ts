"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { Comment } from "@/lib/supabase"
import {
  requireUser,
  validateId,
  toUserMessage,
  FriendlyError,
} from "@/lib/actions-helpers"

async function getCommentOrThrow(id: number): Promise<Comment> {
  const supabase = await createClient()
  await requireUser(supabase)
  const recordId = validateId(id, "Comment")

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", recordId)
    .single()

  if (error || !data) throw new FriendlyError("Komentar tidak ditemukan")
  return data as Comment
}

function publicPathFor(comment: Comment): string {
  return comment.target_type === "post"
    ? `/blog/${comment.target_slug}`
    : `/project/${comment.target_slug}`
}

export async function approveComment(id: number) {
  try {
    const comment = await getCommentOrThrow(id)
    const supabase = await createClient()

    const { error } = await supabase
      .from("comments")
      .update({ status: "approved" })
      .eq("id", comment.id)
    if (error) throw error

    revalidatePath("/admin/comments")
    revalidatePath(publicPathFor(comment))
    return { success: true, message: "Komentar disetujui" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menyetujui komentar"),
    }
  }
}

export async function rejectComment(id: number) {
  try {
    const comment = await getCommentOrThrow(id)
    const supabase = await createClient()

    const { error } = await supabase
      .from("comments")
      .update({ status: "rejected" })
      .eq("id", comment.id)
    if (error) throw error

    revalidatePath("/admin/comments")
    return { success: true, message: "Komentar ditolak" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menolak komentar"),
    }
  }
}

export async function deleteComment(id: number) {
  try {
    const comment = await getCommentOrThrow(id)
    const supabase = await createClient()

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id)
    if (error) throw error

    revalidatePath("/admin/comments")
    revalidatePath(publicPathFor(comment))
    return { success: true, message: "Komentar dihapus" }
  } catch (err) {
    return {
      success: false,
      message: toUserMessage(err, "Gagal menghapus komentar"),
    }
  }
}
