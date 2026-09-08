"use client";

import Link from "next/link";
import type { Contact } from "@/lib/supabase";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteContact } from "./actions";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="p-3">Nama</th>
            <th className="p-3">URL</th>
            <th className="p-3">Username</th>
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
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {c.url}
                </a>
              </td>
              <td className="p-3">
                <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
                  {c.username}
                </span>
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
                  <DeleteButton
                    itemLabel={c.name}
                    onDelete={() => deleteContact(c.id)}
                  />
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
