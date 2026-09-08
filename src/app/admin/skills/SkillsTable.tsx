"use client";

import Link from "next/link";
import type { Skill } from "@/lib/supabase";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "./actions";

export function SkillsTable({ skills }: { skills: Skill[] }) {

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Logo</th>
            <th className="p-3">Nama Skill</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.id} className="border-t border-neutral-800">
              <td className="p-3">
                {s.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-8 w-8 rounded object-contain bg-neutral-800 p-0.5"
                  />
                ) : (
                  <span className="text-neutral-600">-</span>
                )}
              </td>
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
                  <DeleteButton
                    itemLabel={s.name}
                    onDelete={() => deleteSkill(s.id)}
                  />
                </div>
              </td>
            </tr>
          ))}

          {skills.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-neutral-500">
                Belum ada data skill
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
