"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Skill } from "@/lib/supabase";
import type { SkillFormState } from "@/lib/validations/skill";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { IMAGE_INPUT_ACCEPT } from "@/lib/config";

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
  const [logoPreview, setLogoPreview] = useState<string | null>(
    skill?.logo ?? null,
  );
  const [removeLogo, setRemoveLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setRemoveLogo(false);
    }
  }

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

      <div>
        <label className="text-sm text-neutral-300">Logo (opsional)</label>
        <input
          ref={fileInputRef}
          type="file"
          name="logo"
          accept={IMAGE_INPUT_ACCEPT}
          onChange={handleLogoChange}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white file:mr-3 file:rounded file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white"
        />
        {state.errors?.logo && (
          <p className="mt-1 text-xs text-red-400">{state.errors.logo[0]}</p>
        )}
        {logoPreview && !removeLogo && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoPreview}
              alt="Logo preview"
              className="h-16 w-16 rounded object-contain bg-neutral-800 p-1"
            />
            <button
              type="button"
              onClick={() => {
                setRemoveLogo(true);
                setLogoPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="mt-2 rounded bg-red-500/10 px-3 py-1 text-xs text-red-400"
            >
              Hapus logo
            </button>
          </div>
        )}
        {removeLogo && <input type="hidden" name="remove_logo" value="on" />}
      </div>

      <SubmitButton
        pending={isPending}
        mode={mode}
        createLabel="Tambah Skill"
      />
    </form>
  );
}
