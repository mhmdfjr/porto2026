"use client";

import Link from "next/link";
import type { Feature } from "@/lib/supabase";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFeature } from "./actions";

export function FeaturesTable({ features }: { features: Feature[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Feature</th>
            <th className="p-3">Deskripsi</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.id} className="border-t border-neutral-800">
              <td className="p-3 font-medium">{f.feature}</td>
              <td className="max-w-xs truncate p-3 text-neutral-400">
                {f.description}
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(f.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/features/${f.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    itemLabel={f.feature}
                    onDelete={() => deleteFeature(f.id)}
                  />
                </div>
              </td>
            </tr>
          ))}

          {features.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-neutral-500">
                Belum ada feature
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
