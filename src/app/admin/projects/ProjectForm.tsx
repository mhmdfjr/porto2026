"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Project } from "@/lib/supabase";
import type { ProjectFormState } from "@/lib/validations/project";
import { FormField, fieldInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { IMAGE_INPUT_ACCEPT } from "@/lib/config";

type Props = {
  mode: "create" | "edit";
  project?: Project;
  action: (
    state: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  onSuccess?: () => void;
};

const initialState: ProjectFormState = { success: false, message: "" };

export function ProjectForm({ mode, project, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Controlled state untuk field teks
  const [values, setValues] = useState(() => ({
    name: project?.name ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    techstack: project?.techstack?.join(", ") ?? "",
    live_url: project?.live_url ?? "",
    code_url: project?.code_url ?? "",
  }));

  const [existingImages, setExistingImages] = useState<string[]>(
    project?.images ?? [],
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      // onSuccess navigates away; failed input is intentionally kept.
      onSuccess?.();
    } else {
      toast.error(state.message);
      if (selectedFiles.length > 0 && fileInputRef.current) {
        const dt = new DataTransfer();
        selectedFiles.forEach((file) => dt.items.add(file));
        fileInputRef.current.files = dt.files;
      }
    }
    // selectedFiles is intentionally read here to restore the
    // file input after a failed submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, onSuccess]);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      setSelectedFiles(files);

      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews(files.map((f) => URL.createObjectURL(f)));
    }
  }

  function removeExistingImage(url: string) {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg bg-neutral-900 p-4"
    >
      <FormField label="Nama Project" error={state.errors?.name?.[0]}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        label="Slug (kosongkan = otomatis dari nama)"
        error={state.errors?.slug?.[0]}
      >
        <input
          name="slug"
          value={values.slug}
          onChange={handleChange("slug")}
          placeholder="nama-project-saya"
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Deskripsi" error={state.errors?.description?.[0]}>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          rows={3}
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        label="Techstack (pisahkan dengan koma)"
        error={state.errors?.techstack?.[0]}
      >
        <input
          name="techstack"
          value={values.techstack}
          onChange={handleChange("techstack")}
          placeholder="Next.js, Tailwind, Supabase"
          className={fieldInputClass}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Live URL" error={state.errors?.live_url?.[0]}>
          <input
            name="live_url"
            value={values.live_url}
            onChange={handleChange("live_url")}
            placeholder="https://..."
            className={fieldInputClass}
          />
        </FormField>
        <FormField label="Code URL" error={state.errors?.code_url?.[0]}>
          <input
            name="code_url"
            value={values.code_url}
            onChange={handleChange("code_url")}
            placeholder="https://github.com/..."
            className={fieldInputClass}
          />
        </FormField>
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Gambar Project (bisa lebih dari 1)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="images"
          multiple
          accept={IMAGE_INPUT_ACCEPT}
          onChange={handleFileChange}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white file:mr-3 file:rounded file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white"
        />
        {state.errors?.images && (
          <p className="mt-1 text-xs text-red-400">{state.errors.images[0]}</p>
        )}

        {/* Gambar existing (mode edit) */}
        {existingImages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {existingImages.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="h-20 w-20 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {previews.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-20 w-20 rounded object-cover opacity-80"
              />
            ))}
          </div>
        )}

        <input
          type="hidden"
          name="existingImages"
          value={JSON.stringify(existingImages)}
        />
      </div>

      <SubmitButton
        pending={isPending}
        mode={mode}
        createLabel="Tambah Project"
      />
    </form>
  );
}
