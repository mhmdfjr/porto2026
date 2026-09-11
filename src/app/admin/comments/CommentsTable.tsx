"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Comment } from "@/lib/supabase";
import { approveComment, rejectComment, deleteComment } from "./actions";

const statusStyle: Record<Comment["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  approved: "bg-green-500/10 text-green-400",
  rejected: "bg-red-500/10 text-red-400",
};

export function CommentsTable({ comments }: { comments: Comment[] }) {
  const [pendingId, setPendingId] = useState<number | null>(null);

  async function run(
    id: number,
    action: (id: number) => Promise<{ success: boolean; message: string }>,
  ) {
    setPendingId(id);
    try {
      const result = await action(id);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Target</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Komentar</th>
            <th className="p-3">Status</th>
            <th className="p-3">Tanggal</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id} className="border-t border-neutral-800">
              <td className="p-3 whitespace-nowrap">
                <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
                  {c.target_type === "post" ? "Blog" : "Project"}
                </span>
                <span className="ml-2 text-xs text-neutral-500">
                  /{c.target_slug}
                </span>
              </td>
              <td className="p-3 font-medium">{c.name}</td>
              <td className="max-w-xs p-3 text-neutral-400 whitespace-pre-line">
                {c.message}
              </td>
              <td className="p-3">
                <span
                  className={`rounded px-2 py-0.5 text-xs ${statusStyle[c.status]}`}
                >
                  {c.status}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap text-neutral-400">
                {new Date(c.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  {c.status !== "approved" && (
                    <button
                      disabled={pendingId === c.id}
                      onClick={() => run(c.id, approveComment)}
                      className="rounded bg-green-500/10 px-3 py-1 text-green-400 hover:bg-green-500/20 disabled:opacity-50"
                    >
                      Approve
                    </button>
                  )}
                  {c.status !== "rejected" && (
                    <button
                      disabled={pendingId === c.id}
                      onClick={() => run(c.id, rejectComment)}
                      className="rounded bg-yellow-500/10 px-3 py-1 text-yellow-400 hover:bg-yellow-500/20 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    disabled={pendingId === c.id}
                    onClick={() => {
                      if (confirm(`Hapus komentar dari ${c.name}?`)) {
                        run(c.id, deleteComment);
                      }
                    }}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {comments.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-neutral-500">
                Belum ada komentar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
