"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Work } from "@/lib/supabase";
import type { WorkFormState } from "@/lib/validations/work";

type Props = {
  mode: "create" | "edit";
  work?: Work;
  action: (state: WorkFormState, formData: FormData) => Promise<WorkFormState>;
  onSuccess?: () => void;
};

const initialState: WorkFormState = { success: false, message: "" };

const emptyValues = {
  company: "",
  role: "",
  location: "",
  start: "",
  end: "",
};

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
        <label className="text-sm text-neutral-300">Perusahaan</label>
        <input
          name="company"
          value={values.company}
          onChange={handleChange("company")}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.company && (
          <p className="mt-1 text-xs text-red-400">{state.errors.company[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Posisi/Role</label>
        <input
          name="role"
          value={values.role}
          onChange={handleChange("role")}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.role && (
          <p className="mt-1 text-xs text-red-400">{state.errors.role[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Lokasi</label>
        <input
          name="location"
          value={values.location}
          onChange={handleChange("location")}
          placeholder="Jakarta, Indonesia / Remote"
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
            Tanggal Selesai (kosongkan jika masih bekerja)
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
          Logo/Gambar Perusahaan
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
