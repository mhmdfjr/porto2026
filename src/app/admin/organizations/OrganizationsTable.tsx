"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Organization } from "@/lib/supabase";
import { deleteOrganization } from "./actions";

export function OrganizationsTable({
  organizations,
}: {
  organizations: Organization[];
}) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(organization: Organization) {
    if (!confirm(`Hapus data organisasi "${organization.name}"?`)) return;

    setDeletingId(organization.id);
    startTransition(async () => {
      const result = await deleteOrganization(
        organization.id,
        organization.image,
      );
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
            <th className="p-3">Nama Organisasi</th>
            <th className="p-3">Lokasi</th>
            <th className="p-3">Tahun</th>
            <th className="p-3">Role</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((o) => (
            <tr key={o.id} className="border-t border-neutral-800">
              <td className="p-3">
                {o.image ? (
                  <img
                    src={o.image}
                    alt={o.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <span className="text-neutral-600">-</span>
                )}
              </td>
              <td className="p-3 font-medium">{o.name}</td>
              <td className="p-3 text-neutral-400">{o.location}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {o.year?.map((y, i) => (
                    <span
                      key={`${y}-${i}`}
                      className="rounded bg-neutral-800 px-2 py-0.5 text-xs"
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {o.role?.map((r, i) => (
                    <span
                      key={`${r}-${i}`}
                      className="rounded bg-neutral-800 px-2 py-0.5 text-xs"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(o.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/organizations/${o.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(o)}
                    disabled={isPending && deletingId === o.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === o.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {organizations.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-neutral-500">
                Belum ada data organisasi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
