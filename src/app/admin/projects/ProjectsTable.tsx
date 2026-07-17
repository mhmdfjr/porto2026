"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Project } from "@/lib/supabase";
import { deleteProject } from "@/app/admin/projects/actions";

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(project: Project) {
    if (!confirm(`Hapus project "${project.name}"?`)) return;

    setDeletingId(project.id);
    startTransition(async () => {
      const result = await deleteProject(project.id, project.images ?? []);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setDeletingId(null);
    });
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Gambar</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Deskripsi</th>
            <th className="p-3">Techstack</th>
            <th className="p-3">Live URL</th>
            <th className="p-3">Code URL</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t border-neutral-800">
              <td className="p-3">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <span className="text-neutral-600">-</span>
                )}
              </td>
              <td className="p-3 font-medium">{p.name}</td>
              <td className="max-w-xs truncate p-3 text-neutral-400">
                {p.description}
              </td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {p.techstack?.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-neutral-800 px-2 py-0.5 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-3">
                {p.live_url ? (
                  <a
                    href={p.live_url}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-3">
                {p.code_url ? (
                  <a
                    href={p.code_url}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(p.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
                    disabled={isPending && deletingId === p.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === p.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {projects.length === 0 && (
            <tr>
              <td colSpan={8} className="p-6 text-center text-neutral-500">
                Belum ada project
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
