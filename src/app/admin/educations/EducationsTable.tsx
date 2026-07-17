"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Education } from "@/lib/supabase";
import { formatDateRange } from "@/lib/database";
import { deleteEducation } from "./actions";

export function EducationsTable({ educations }: { educations: Education[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(education: Education) {
    if (!confirm(`Hapus data pendidikan di "${education.name}"?`)) return;

    setDeletingId(education.id);
    startTransition(async () => {
      const result = await deleteEducation(education.id, education.image);
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
            <th className="p-3">Institusi</th>
            <th className="p-3">Jurusan</th>
            <th className="p-3">Lokasi</th>
            <th className="p-3">Periode</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((e) => (
            <tr key={e.id} className="border-t border-neutral-800">
              <td className="p-3">
                {e.image ? (
                  <img
                    src={e.image}
                    alt={e.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <span className="text-neutral-600">-</span>
                )}
              </td>
              <td className="p-3 font-medium">{e.name}</td>
              <td className="p-3">{e.major}</td>
              <td className="p-3 text-neutral-400">{e.location || "-"}</td>
              <td className="p-3 text-neutral-400">
                {formatDateRange(e.start, e.end)}
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(e.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/educations/${e.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(e)}
                    disabled={isPending && deletingId === e.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === e.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {educations.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-neutral-500">
                Belum ada data pendidikan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
