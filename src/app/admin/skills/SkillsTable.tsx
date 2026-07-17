"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Skill } from "@/lib/supabase";
import { deleteSkill } from "./actions";

export function SkillsTable({ skills }: { skills: Skill[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(skill: Skill) {
    if (!confirm(`Hapus skill "${skill.name}"?`)) return;

    setDeletingId(skill.id);
    startTransition(async () => {
      const result = await deleteSkill(skill.id);
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
            <th className="p-3">Nama Skill</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.id} className="border-t border-neutral-800">
              <td className="p-3 font-medium">{s.name}</td>
              <td className="p-3 text-neutral-400">
                {new Date(s.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/skills/${s.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s)}
                    disabled={isPending && deletingId === s.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === s.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {skills.length === 0 && (
            <tr>
              <td colSpan={3} className="p-6 text-center text-neutral-500">
                Belum ada data skill
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
