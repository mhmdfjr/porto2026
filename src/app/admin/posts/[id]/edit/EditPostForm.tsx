"use client";

import { useRouter } from "next/navigation";
import type { Post } from "@/lib/supabase";
import { PostForm } from "../../PostForm";
import { updatePost } from "../../actions";
import type { PostFormState } from "@/lib/validations/post";

export function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();

  async function action(state: PostFormState, formData: FormData) {
    return updatePost(post.id, state, formData);
  }

  return (
    <PostForm
      mode="edit"
      post={post}
      action={action}
      onSuccess={() => router.push("/admin/posts")}
    />
  );
}
