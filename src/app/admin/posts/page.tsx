import Link from "next/link";
import { getAllPostsAdmin } from "@/lib/posts-admin";
import { PostsTable } from "./PostsTable";

// Admin pages use session cookies, never prerender statically.
export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Link
          href="/admin/posts/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Artikel
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  );
}
