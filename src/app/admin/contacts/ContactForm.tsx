"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Contact } from "@/lib/supabase";
import type { ContactFormState } from "@/lib/validations/contact";

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

const emptyValues = {
  name: "",
  url: "",
  icon: "",
};

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

      // Reset form HANYA setelah sukses, dan HANYA untuk mode create
      if (mode === "create") {
        setValues(emptyValues);
      }

      onSuccess?.();
    } else {
      toast.error(state.message);
      // Sengaja TIDAK reset `values` di sini —
      // input yang sudah benar tetap dipertahankan,
      // user cuma perlu perbaiki field yang errornya muncul.
    }
  }, [state]);

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
      <div>
        <label className="text-sm text-neutral-300">Nama Kontak</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="GitHub, LinkedIn, Email"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">URL</label>
        <input
          name="url"
          value={values.url}
          onChange={handleChange("url")}
          placeholder="https://github.com/username"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.url && (
          <p className="mt-1 text-xs text-red-400">{state.errors.url[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Nama Icon</label>
        <input
          name="icon"
          value={values.icon}
          onChange={handleChange("icon")}
          placeholder="github, linkedin, mail"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Sesuaikan dengan nama icon yang dipakai di komponen (misal dari
          lucide-react).
        </p>
        {state.errors?.icon && (
          <p className="mt-1 text-xs text-red-400">{state.errors.icon[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-white py-2 font-semibold text-black disabled:opacity-50"
      >
        {isPending
          ? "Menyimpan..."
          : mode === "create"
            ? "Tambah Kontak"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
