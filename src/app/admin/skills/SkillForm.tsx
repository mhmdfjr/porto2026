"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Skill } from "@/lib/supabase";
import type { SkillFormState } from "@/lib/validations/skill";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

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
      // onSuccess navigates away; failed input is intentionally kept.
      onSuccess?.();
    } else {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg bg-neutral-900 p-4"
    >
      <FormField label="Nama Skill" error={state.errors?.name?.[0]}>
        <input
          name="name"
          value={values.name}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Next.js, TypeScript, Supabase"
          className={fieldInputClass}
        />
      </FormField>

      <SubmitButton
        pending={isPending}
        mode={mode}
        createLabel="Tambah Skill"
      />
    </form>
  );
}
