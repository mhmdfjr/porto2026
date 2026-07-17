"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Contact } from "@/lib/supabase";
import { deleteContact } from "./actions";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(contact: Contact) {
    if (!confirm(`Hapus kontak "${contact.name}"?`)) return;

    setDeletingId(contact.id);
    startTransition(async () => {
      const result = await deleteContact(contact.id);
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
            <th className="p-3">Nama</th>
            <th className="p-3">URL</th>
            <th className="p-3">Icon</th>
            <th className="p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-t border-neutral-800">
              <td className="p-3 font-medium">{c.name}</td>
              <td className="p-3">
                <a
                  href={c.url}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  {c.url}
                </a>
              </td>
              <td className="p-3">
                <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
                  {c.icon}
                </span>
              </td>
              <td className="p-3 text-neutral-400">
                {new Date(c.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/contacts/${c.id}/edit`}
                    className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c)}
                    disabled={isPending && deletingId === c.id}
                    className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {isPending && deletingId === c.id
                      ? "Menghapus..."
                      : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {contacts.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-neutral-500">
                Belum ada data kontak
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
