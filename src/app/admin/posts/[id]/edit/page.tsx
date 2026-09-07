import { notFound } from "next/navigation";
import { getPostByIdAdmin } from "@/lib/posts-admin";
import { EditPostForm } from "./EditPostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdAdmin(Number(id));

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Artikel</h1>
      <EditPostForm post={post} />
    </div>
  );
}
