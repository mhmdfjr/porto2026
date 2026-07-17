"use client";

import { useRouter } from "next/navigation";
import type { Contact } from "@/lib/supabase";
import { ContactForm } from "../../ContactForm";
import { updateContact } from "../../actions";
import type { ContactFormState } from "@/lib/validations/contact";

export function EditContactForm({ contact }: { contact: Contact }) {
  const router = useRouter();

  async function action(state: ContactFormState, formData: FormData) {
    return updateContact(contact.id, state, formData);
  }

  return (
    <ContactForm
      mode="edit"
      contact={contact}
      action={action}
      onSuccess={() => router.push("/admin/contacts")}
    />
  );
}
