"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Project } from "@/lib/supabase";
import type { ProjectFormState } from "@/lib/validations/project";

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

const emptyValues = {
  name: "",
  description: "",
  techstack: "",
  live_url: "",
  code_url: "",
};

export function ProjectForm({ mode, project, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Controlled state untuk field teks
  const [values, setValues] = useState(() => ({
    name: project?.name ?? "",
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

      if (mode === "create") {
        setValues(emptyValues);
        setExistingImages([]);
        setSelectedFiles([]);

        previews.forEach((url) => URL.revokeObjectURL(url));
        setPreviews([]);

        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      onSuccess?.();
    } else {
      toast.error(state.message);
      if (selectedFiles.length > 0 && fileInputRef.current) {
        const dt = new DataTransfer();
        selectedFiles.forEach((file) => dt.items.add(file));
        fileInputRef.current.files = dt.files;
      }
    }
  }, [state]);

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
      <div>
        <label className="text-sm text-neutral-300">Nama Project</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Deskripsi</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          rows={3}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.description && (
          <p className="mt-1 text-xs text-red-400">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Techstack (pisahkan dengan koma)
        </label>
        <input
          name="techstack"
          value={values.techstack}
          onChange={handleChange("techstack")}
          placeholder="Next.js, Tailwind, Supabase"
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.techstack && (
          <p className="mt-1 text-xs text-red-400">
            {state.errors.techstack[0]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-300">Live URL</label>
          <input
            name="live_url"
            value={values.live_url}
            onChange={handleChange("live_url")}
            placeholder="https://..."
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.live_url && (
            <p className="mt-1 text-xs text-red-400">
              {state.errors.live_url[0]}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-300">Code URL</label>
          <input
            name="code_url"
            value={values.code_url}
            onChange={handleChange("code_url")}
            placeholder="https://github.com/..."
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.code_url && (
            <p className="mt-1 text-xs text-red-400">
              {state.errors.code_url[0]}
            </p>
          )}
        </div>
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
          accept="image/*"
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

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-white py-2 font-semibold text-black disabled:opacity-50"
      >
        {isPending
          ? "Menyimpan..."
          : mode === "create"
            ? "Tambah Project"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
