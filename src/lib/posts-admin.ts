import { createClient } from "@/lib/supabase/server";
import type { Post } from "./supabase";

/**
 * Admin-only post queries. Uses the SSR server client (with session
 * cookies) so drafts are visible. Import ONLY from admin server
 * components/pages — never from client components, because this
 * module pulls in next/headers.
 */

export async function getAllPostsAdmin(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching all posts (admin):", error);
      return [];
    }

    return (data ?? []) as Post[];
  } catch (error) {
    console.error("Error fetching all posts (admin):", error);
    return [];
  }
}

export async function getPostByIdAdmin(id: number): Promise<Post | null> {
  if (!Number.isInteger(id) || id <= 0) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching post ${id} (admin):`, error);
      return null;
    }

    return data as Post;
  } catch (error) {
    console.error(`Error fetching post ${id} (admin):`, error);
    return null;
  }
}
