"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Organization } from "@/lib/supabase";
import type { OrganizationFormState } from "@/lib/validations/organization";

type Props = {
  mode: "create" | "edit";
  organization?: Organization;
  action: (
    state: OrganizationFormState,
    formData: FormData,
  ) => Promise<OrganizationFormState>;
  onSuccess?: () => void;
};

const initialState: OrganizationFormState = { success: false, message: "" };

const emptyValues = {
  name: "",
  location: "",
  year: "",
  role: "",
};

export function OrganizationForm({
  mode,
  organization,
  action,
  onSuccess,
}: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Controlled state untuk semua field teks
  const [values, setValues] = useState(() => ({
    name: organization?.name ?? "",
    location: organization?.location ?? "",
    year: organization?.year?.join(", ") ?? "",
    role: organization?.role?.join(", ") ?? "",
  }));

  // Simpan FILE ASLI (referensi), bukan cuma URL preview-nya
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    organization?.image ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      // Reset form HANYA setelah sukses, dan HANYA untuk mode create
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
      // Sengaja TIDAK reset `values`/`selectedFile`/`preview` di sini —
      // input yang sudah benar tetap dipertahankan, user cuma perlu
      // perbaiki field yang errornya muncul.

      // Suntik ulang file yang sudah dipilih sebelumnya ke input,
      // supaya user TIDAK perlu pilih gambar lagi.
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

      // Bersihkan URL preview lama sebelum bikin yang baru,
      // supaya tidak menumpuk memory leak
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
        <label className="text-sm text-neutral-300">Nama Organisasi</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Himpunan Mahasiswa Informatika"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Lokasi</label>
        <input
          name="location"
          value={values.location}
          onChange={handleChange("location")}
          placeholder="Jakarta, Indonesia"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.location && (
          <p className="mt-1 text-xs text-red-400">
            {state.errors.location[0]}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Tahun (pisahkan dengan koma)
        </label>
        <input
          name="year"
          value={values.year}
          onChange={handleChange("year")}
          placeholder="2021, 2022, 2023"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.year && (
          <p className="mt-1 text-xs text-red-400">{state.errors.year[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Role (pisahkan dengan koma, urutan sesuai tahun)
        </label>
        <input
          name="role"
          value={values.role}
          onChange={handleChange("role")}
          placeholder="Anggota, Ketua Divisi, Ketua Umum"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.role && (
          <p className="mt-1 text-xs text-red-400">{state.errors.role[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Logo/Gambar Organisasi
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
