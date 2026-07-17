"use client";

import { useRouter } from "next/navigation";
import { ContactForm } from "../ContactForm";
import { createContact } from "../actions";

export default function CreateContactPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Kontak</h1>
      <ContactForm
        mode="create"
        action={createContact}
        onSuccess={() => router.push("/admin/contacts")}
      />
    </div>
  );
}
