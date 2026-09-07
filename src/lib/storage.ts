import type { SupabaseClient } from "@supabase/supabase-js";
import { storageConfig } from "./config";

export class UploadValidationError extends Error {}

function getExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? (parts.pop() as string) : "";
}

export function validateImageFile(file: File): void {
  if (file.size === 0) {
    throw new UploadValidationError("File gambar kosong.");
  }
  if (file.size > storageConfig.maxFileSizeBytes) {
    const maxMB = storageConfig.maxFileSizeBytes / (1024 * 1024);
    throw new UploadValidationError(
      `Ukuran gambar maksimal ${maxMB}MB.`,
    );
  }
  const ext = getExtension(file.name);
  if (!storageConfig.allowedExtensions.includes(ext as never)) {
    throw new UploadValidationError(
      "Format gambar harus JPG, PNG, atau WebP.",
    );
  }
  if (
    file.type &&
    !(storageConfig.allowedMimeTypes as readonly string[]).includes(file.type)
  ) {
    throw new UploadValidationError(
      "Tipe file tidak didukung. Gunakan JPG, PNG, atau WebP.",
    );
  }
}

function randomSuffix(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  folder: string,
): Promise<string> {
  validateImageFile(file);
  const ext = getExtension(file.name);
  const path = `${folder}/${randomSuffix()}.${ext}`;

  const { error } = await supabase.storage
    .from(storageConfig.bucket)
    .upload(path, file, {
      contentType: file.type || undefined,
      upsert: false,
    });
  if (error) throw new Error("Gagal mengunggah gambar. Coba lagi.");

  const { data } = supabase.storage
    .from(storageConfig.bucket)
    .getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImages(
  supabase: SupabaseClient,
  files: File[],
  folder: string,
): Promise<string[]> {
  const valid = files.filter((f) => f && f.size > 0);
  if (valid.length > storageConfig.maxFilesPerRecord) {
    throw new UploadValidationError(
      `Maksimal ${storageConfig.maxFilesPerRecord} gambar per data.`,
    );
  }
  const urls: string[] = [];
  for (const file of valid) {
    urls.push(await uploadImage(supabase, file, folder));
  }
  return urls;
}

/**
 * Extract a storage path from a public URL, but only if it belongs
 * to our bucket. Returns null for foreign URLs so callers never
 * delete files outside our control.
 */
export function extractStoragePath(publicUrl: string): string | null {
  if (!publicUrl) return null;
  const marker = `${storageConfig.bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  const path = publicUrl.slice(idx + marker.length);
  if (!path || path.includes("..")) return null;
  return path;
}

/** Best-effort removal; storage errors are logged, never thrown. */
export async function removeStoragePaths(
  supabase: SupabaseClient,
  paths: (string | null | undefined)[],
): Promise<void> {
  const filtered = paths.filter((p): p is string => Boolean(p));
  if (filtered.length === 0) return;
  const { error } = await supabase.storage
    .from(storageConfig.bucket)
    .remove(filtered);
  if (error) {
    console.error("Failed to remove storage objects:", error);
  }
}
