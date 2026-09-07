"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default function CreatePostPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Artikel</h1>
      <PostForm
        mode="create"
        action={createPost}
        onSuccess={() => router.push("/admin/posts")}
      />
    </div>
  );
}
