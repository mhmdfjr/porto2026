"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Contact } from "@/lib/supabase";
import type { ContactFormState } from "@/lib/validations/contact";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

type Props = {
  mode: "create" | "edit";
  contact?: Contact;
  action: (
    state: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
  onSuccess?: () => void;
};

const initialState: ContactFormState = { success: false, message: "" };

export function ContactForm({ mode, contact, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Controlled state untuk semua field
  const [values, setValues] = useState(() => ({
    name: contact?.name ?? "",
    url: contact?.url ?? "",
    icon: contact?.icon ?? "",
  }));

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      // onSuccess navigates away; failed input is intentionally kept.
      onSuccess?.();
    } else {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg bg-neutral-900 p-4"
    >
      <FormField label="Nama Kontak" error={state.errors?.name?.[0]}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="GitHub, LinkedIn, Email"
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="URL" error={state.errors?.url?.[0]}>
        <input
          name="url"
          value={values.url}
          onChange={handleChange("url")}
          placeholder="https://github.com/username"
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Nama Icon" error={state.errors?.icon?.[0]}>
        <input
          name="icon"
          value={values.icon}
          onChange={handleChange("icon")}
          placeholder="github, linkedin, mail"
          className={fieldInputClass}
        />
        <p className="mt-1 text-xs text-neutral-500">
          Sesuaikan dengan nama icon yang dipakai di komponen (misal dari
          lucide-react).
        </p>
      </FormField>

      <SubmitButton
        pending={isPending}
        mode={mode}
        createLabel="Tambah Kontak"
      />
    </form>
  );
}
