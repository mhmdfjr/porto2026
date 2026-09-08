"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Post } from "@/lib/supabase";
import { slugifyTitle, type PostFormState } from "@/lib/validations/post";
import { PostEditor } from "@/components/admin/PostEditor";
import { IMAGE_INPUT_ACCEPT } from "@/lib/config";

type Props = {
  mode: "create" | "edit";
  post?: Post;
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  onSuccess?: () => void;
};

const initialState: PostFormState = { success: false, message: "" };

function initialJsonOf(post?: Post): string {
  if (!post?.content_json) return "";
  try {
    return JSON.stringify(post.content_json);
  } catch {
    return "";
  }
}

export function PostForm({ mode, post, action, onSuccess }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [values, setValues] = useState(() => ({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    tags: post?.tags?.join(", ") ?? "",
    status: post?.status ?? "draft",
    featured: post?.featured ?? false,
  }));
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [contentJson, setContentJson] = useState(() => initialJsonOf(post));
  const [contentHtml, setContentHtml] = useState(() => post?.content_html ?? "");
  const [coverPreview, setCoverPreview] = useState<string | null>(
    post?.cover_image ?? null,
  );
  const [removeCover, setRemoveCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      onSuccess?.();
    } else {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  function handleChange(field: "title" | "slug" | "excerpt" | "tags" | "status") {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const next = e.target.value;
      setValues((prev) => {
        if (field === "title" && !slugTouched) {
          return { ...prev, title: next, slug: slugifyTitle(next) };
        }
        return { ...prev, [field]: next };
      });
    };
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setRemoveCover(false);
    }
  }

  function handleEditorChange(json: string, html: string) {
    setContentJson(json);
    setContentHtml(html);
  }

  return (
    <form action={formAction} className="space-y-4 rounded-lg bg-neutral-900 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">Judul</label>
          <input
            name="title"
            value={values.title}
            onChange={handleChange("title")}
            maxLength={120}
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.title && (
            <p className="mt-1 text-xs text-red-400">{state.errors.title[0]}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-300">Slug (URL)</label>
          <input
            name="slug"
            value={values.slug}
            onChange={handleChange("slug")}
            onBlur={() => setSlugTouched(true)}
            placeholder="otomatis-dari-judul"
            maxLength={120}
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.slug && (
            <p className="mt-1 text-xs text-red-400">{state.errors.slug[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Ringkasan (excerpt, maks 200 — kosongkan untuk otomatis)
        </label>
        <textarea
          name="excerpt"
          value={values.excerpt}
          onChange={handleChange("excerpt")}
          rows={2}
          maxLength={200}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
        />
        {state.errors?.excerpt && (
          <p className="mt-1 text-xs text-red-400">{state.errors.excerpt[0]}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm text-neutral-300">Tags (koma)</label>
          <input
            name="tags"
            value={values.tags}
            onChange={handleChange("tags")}
            placeholder="nextjs, tutorial"
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          />
          {state.errors?.tags && (
            <p className="mt-1 text-xs text-red-400">{state.errors.tags[0]}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-neutral-300">Status</label>
          <select
            name="status"
            value={values.status}
            onChange={handleChange("status")}
            className="mt-1 w-full rounded bg-neutral-800 p-2 text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {state.errors?.status && (
            <p className="mt-1 text-xs text-red-400">{state.errors.status[0]}</p>
          )}
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="featured"
            type="checkbox"
            name="featured"
            checked={values.featured}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, featured: e.target.checked }))
            }
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm text-neutral-300">
            Featured
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Cover (opsional)</label>
        <input
          ref={fileInputRef}
          type="file"
          name="cover"
          accept={IMAGE_INPUT_ACCEPT}
          onChange={handleCoverChange}
          className="mt-1 w-full rounded bg-neutral-800 p-2 text-white file:mr-3 file:rounded file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white"
        />
        {state.errors?.cover && (
          <p className="mt-1 text-xs text-red-400">{state.errors.cover[0]}</p>
        )}
        {coverPreview && !removeCover && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverPreview}
              alt="Cover preview"
              className="h-32 rounded object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setRemoveCover(true);
                setCoverPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="mt-2 rounded bg-red-500/10 px-3 py-1 text-xs text-red-400"
            >
              Hapus cover
            </button>
          </div>
        )}
        {removeCover && (
          <input type="hidden" name="remove_cover" value="on" />
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">Konten</label>
        <div className="mt-1">
          <PostEditor
            initialJson={initialJsonOf(post)}
            onChange={handleEditorChange}
          />
        </div>
        {state.errors?.content_json && (
          <p className="mt-1 text-xs text-red-400">
            {state.errors.content_json[0]}
          </p>
        )}
        <input type="hidden" name="content_json" value={contentJson} />
        <input type="hidden" name="content_html" value={contentHtml} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-white py-2 font-semibold text-black disabled:opacity-50"
      >
        {isPending
          ? "Menyimpan..."
          : mode === "create"
            ? "Tambah Artikel"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
