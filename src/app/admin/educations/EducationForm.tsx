"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Education } from "@/lib/supabase";
import type { EducationFormState } from "@/lib/validations/education";

type Props = {
  mode: "create" | "edit";
  education?: Education;
  action: (
    state: EducationFormState,
    formData: FormData,
  ) => Promise<EducationFormState>;
  onSuccess?: () => void;
};

const initialState: EducationFormState = { success: false, message: "" };

const emptyValues = {
  name: "",
  major: "",
  location: "",
  start: "",
  end: "",
};

export function EducationForm({ mode, education, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [values, setValues] = useState(() => ({
    name: education?.name ?? "",
    major: education?.major ?? "",
    location: education?.location ?? "",
    start: education?.start?.slice(0, 10) ?? "",
    end: education?.end?.slice(0, 10) ?? "",
  }));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    education?.image ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      if (mode === "create") {
        setValues(emptyValues);
        setSelectedFile(null);

        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);

        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      onSuccess?.();
    } else {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(selectedFile);
        fileInputRef.current.files = dt.files;
      }
    }
  }, [state]);

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
      <div>
        <label className="text-sm text-neutral-300">Nama Institusi</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Universitas Indonesia"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Jurusan</label>
        <input
          name="major"
          value={values.major}
          onChange={handleChange("major")}
          placeholder="Ilmu Komputer"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.major && (
          <p className="mt-1 text-xs text-red-400">{state.errors.major[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Lokasi (opsional)</label>
        <input
          name="location"
          value={values.location}
          onChange={handleChange("location")}
          placeholder="Depok, Indonesia"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.location && (
          <p className="mt-1 text-xs text-red-400">
            {state.errors.location[0]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-300">Tanggal Mulai</label>
          <input
            type="date"
            name="start"
            value={values.start}
            onChange={handleChange("start")}
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.start && (
            <p className="mt-1 text-xs text-red-400">{state.errors.start[0]}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-300">
            Tanggal Selesai (kosongkan jika masih berjalan)
          </label>
          <input
            type="date"
            name="end"
            value={values.end}
            onChange={handleChange("end")}
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.end && (
            <p className="mt-1 text-xs text-red-400">{state.errors.end[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Logo/Gambar Institusi
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white file:mr-3 file:rounded file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white"
        />
        {state.errors?.image && (
          <p className="mt-1 text-xs text-red-400">{state.errors.image[0]}</p>
        )}

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt=""
              className="h-20 w-20 rounded object-cover"
            />
          </div>
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
            ? "Tambah Data"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
