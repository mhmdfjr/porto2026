"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Skill } from "@/lib/supabase";
import type { SkillFormState } from "@/lib/validations/skill";

type Props = {
  mode: "create" | "edit";
  skill?: Skill;
  action: (
    state: SkillFormState,
    formData: FormData,
  ) => Promise<SkillFormState>;
  onSuccess?: () => void;
};

const initialState: SkillFormState = { success: false, message: "" };

const emptyValues = {
  name: "",
};

export function SkillForm({ mode, skill, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Controlled state untuk field name
  const [values, setValues] = useState(() => ({
    name: skill?.name ?? "",
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
      // input yang sudah diisi tetap dipertahankan.
    }
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, name: e.target.value }));
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg bg-neutral-900 p-4"
    >
      <div>
        <label className="text-sm text-neutral-300">Nama Skill</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Next.js, TypeScript, Supabase"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
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
            ? "Tambah Skill"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
