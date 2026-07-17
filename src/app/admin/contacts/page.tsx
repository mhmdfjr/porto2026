import Link from "next/link";
import { getContacts } from "@/lib/database";
import { ContactsTable } from "./ContactsTable";

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Contacts</h1>
        <Link
          href="/admin/contacts/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Kontak
        </Link>
      </div>

      <ContactsTable contacts={contacts} />
    </div>
  );
}
