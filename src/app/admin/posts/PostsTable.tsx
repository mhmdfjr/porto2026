"use client";

import Link from "next/link";
import type { Post } from "@/lib/supabase";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePost } from "./actions";

export function PostsTable({ posts }: { posts: Post[] }) {

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Judul</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Status</th>
            <th className="p-3">Featured</th>
            <th className="p-3">Update</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-t border-neutral-800">
              <td className="max-w-xs truncate p-3 font-medium">{p.title}</td>
              <td className="max-w-48 truncate p-3 text-neutral-400">{p.slug}</td>
              <td className="p-3">
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    p.status === "published"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="p-3">{p.featured ? "Ya" : "-"}</td>
              <td className="p-3 text-neutral-400">
                {new Date(p.updated_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    itemLabel={p.title}
                    onDelete={() => deletePost(p.id)}
                  />
                </div>
              </td>
            </tr>
          ))}

          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-neutral-500">
                Belum ada artikel
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
