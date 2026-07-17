"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Work } from "@/lib/supabase";
import { formatDateRange } from "@/lib/database";
import { deleteWork } from "./actions";

export function WorksTable({ works }: { works: Work[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(work: Work) {
    if (!confirm(`Hapus data kerja di "${work.company}"?`)) return;

    setDeletingId(work.id);
    startTransition(async () => {
      const result = await deleteWork(work.id, work.image);
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
            <th className="p-3">Logo</th>
            <th className="p-3">Perusahaan</th>
            <th className="p-3">Posisi</th>
            <th className="p-3">Lokasi</th>
            <th className="p-3">Periode</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {works.map((w) => (
            <tr key={w.id} className="border-t border-neutral-800">
              <td className="p-3">
                {w.image ? (
                  <img
                    src={w.image}
                    alt={w.company}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <span className="text-neutral-600">-</span>
                )}
              </td>
              <td className="p-3 font-medium">{w.company}</td>
              <td className="p-3">{w.role}</td>
              <td className="p-3 text-neutral-400">{w.location}</td>
              <td className="p-3 text-neutral-400">
                {formatDateRange(w.start, w.end)}
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(w.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/works/${w.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(w)}
                    disabled={isPending && deletingId === w.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === w.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {works.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-neutral-500">
                Belum ada data pengalaman kerja
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
