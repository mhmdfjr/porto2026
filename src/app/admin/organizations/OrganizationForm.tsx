"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Organization } from "@/lib/supabase";
import type { OrganizationFormState } from "@/lib/validations/organization";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { IMAGE_INPUT_ACCEPT } from "@/lib/config";

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
      // onSuccess navigates away; failed input is intentionally kept.
      onSuccess?.();
    } else {
      toast.error(state.message);
      // Suntik ulang file yang sudah dipilih sebelumnya ke input,
      // supaya user TIDAK perlu pilih gambar lagi.
      if (selectedFile && fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(selectedFile);
        fileInputRef.current.files = dt.files;
      }
    }
    // selectedFile is intentionally read here to restore the
    // file input after a failed submit.
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
      <FormField label="Nama Organisasi" error={state.errors?.name?.[0]}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Himpunan Mahasiswa Informatika"
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Lokasi" error={state.errors?.location?.[0]}>
        <input
          name="location"
          value={values.location}
          onChange={handleChange("location")}
          placeholder="Jakarta, Indonesia"
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        label="Tahun (pisahkan dengan koma)"
        error={state.errors?.year?.[0]}
      >
        <input
          name="year"
          value={values.year}
          onChange={handleChange("year")}
          placeholder="2021, 2022, 2023"
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        label="Role (pisahkan dengan koma, urutan sesuai tahun)"
        error={state.errors?.role?.[0]}
      >
        <input
          name="role"
          value={values.role}
          onChange={handleChange("role")}
          placeholder="Anggota, Ketua Divisi, Ketua Umum"
          className={fieldInputClass}
        />
      </FormField>

      <div>
        <label className="text-sm text-neutral-300">
          Logo/Gambar Organisasi
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
