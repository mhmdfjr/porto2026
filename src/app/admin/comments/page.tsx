import { getAllCommentsAdmin } from "@/lib/comments-admin";
import { CommentsTable } from "./CommentsTable";

// Admin pages use session cookies, never prerender statically.
export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const comments = await getAllCommentsAdmin();
  const pendingCount = comments.filter((c) => c.status === "pending").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Manage Comments{" "}
          {pendingCount > 0 && (
            <span className="ml-2 rounded bg-yellow-500/10 px-2 py-0.5 text-sm text-yellow-400">
              {pendingCount} pending
            </span>
          )}
        </h1>
      </div>

      <CommentsTable comments={comments} />
    </div>
  );
}
