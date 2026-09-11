import { createClient } from "@/lib/supabase/server";
import type { Comment, CommentStatus } from "./supabase";

/**
 * Admin-only comment queries. Uses the SSR server client (with session
 * cookies) so pending comments are visible. Import ONLY from admin server
 * components/pages — never from client components, because this
 * module pulls in next/headers.
 */

export async function getAllCommentsAdmin(
  status?: CommentStatus,
): Promise<Comment[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching comments (admin):", error);
      return [];
    }

    return (data ?? []) as Comment[];
  } catch (error) {
    console.error("Error fetching comments (admin):", error);
    return [];
  }
}
