"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Feature } from "@/lib/supabase";
import type { FeatureFormState } from "@/lib/validations/feature";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

type Props = {
  mode: "create" | "edit";
  feature?: Feature;
  action: (
    state: FeatureFormState,
    formData: FormData,
  ) => Promise<FeatureFormState>;
  onSuccess?: () => void;
};

const initialState: FeatureFormState = { success: false, message: "" };

export function FeatureForm({ mode, feature, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [values, setValues] = useState(() => ({
    feature: feature?.feature ?? "",
    description: feature?.description ?? "",
  }));

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      // No local reset: onSuccess navigates away (create) or the
      // server data is source of truth (edit).
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
      <FormField label="Feature" error={state.errors?.feature?.[0]}>
        <input
          name="feature"
          value={values.feature}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, feature: e.target.value }))
          }
          maxLength={80}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Deskripsi" error={state.errors?.description?.[0]}>
        <textarea
          name="description"
          value={values.description}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          maxLength={500}
          className={fieldInputClass}
        />
      </FormField>

      <SubmitButton
        pending={isPending}
        mode={mode}
        createLabel="Tambah Feature"
      />
    </form>
  );
}
