"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Work } from "@/lib/supabase";
import type { WorkFormState } from "@/lib/validations/work";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { IMAGE_INPUT_ACCEPT } from "@/lib/config";

type Props = {
  mode: "create" | "edit";
  work?: Work;
  action: (state: WorkFormState, formData: FormData) => Promise<WorkFormState>;
  onSuccess?: () => void;
};

const initialState: WorkFormState = { success: false, message: "" };

export function WorkForm({ mode, work, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [values, setValues] = useState(() => ({
    company: work?.company ?? "",
    role: work?.role ?? "",
    location: work?.location ?? "",
    start: work?.start?.slice(0, 10) ?? "",
    end: work?.end?.slice(0, 10) ?? "",
  }));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(work?.image ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      // onSuccess navigates away; failed input is intentionally kept.
      onSuccess?.();
    } else {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(selectedFile);
        fileInputRef.current.files = dt.files;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, onSuccess]);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg bg-neutral-900 p-4"
    >
      <FormField label="Perusahaan" error={state.errors?.company?.[0]}>
        <input
          name="company"
          value={values.company}
          onChange={handleChange("company")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Posisi/Role" error={state.errors?.role?.[0]}>
        <input
          name="role"
          value={values.role}
          onChange={handleChange("role")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Lokasi" error={state.errors?.location?.[0]}>
        <input
          name="location"
          value={values.location}
          onChange={handleChange("location")}
          placeholder="Jakarta, Indonesia / Remote"
          className={fieldInputClass}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tanggal Mulai" error={state.errors?.start?.[0]}>
          <input
            type="date"
            name="start"
            value={values.start}
            onChange={handleChange("start")}
            className={fieldInputClass}
          />
        </FormField>
        <FormField
          label="Tanggal Selesai (kosongkan jika masih bekerja)"
          error={state.errors?.end?.[0]}
        >
          <input
            type="date"
            name="end"
            value={values.end}
            onChange={handleChange("end")}
            className={fieldInputClass}
          />
        </FormField>
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Logo/Gambar Perusahaan
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept={IMAGE_INPUT_ACCEPT}
          onChange={handleFileChange}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white file:mr-3 file:rounded file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white"
        />
        {state.errors?.image && (
          <p className="mt-1 text-xs text-red-400">{state.errors.image[0]}</p>
        )}

        {preview && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt=""
              className="h-20 w-20 rounded object-cover"
            />
          </div>
        )}
      </div>

      <SubmitButton pending={isPending} mode={mode} createLabel="Tambah Data" />
    </form>
  );
}
