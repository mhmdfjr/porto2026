import type { SupabaseClient } from "@supabase/supabase-js";

export class UnauthorizedError extends Error {
  constructor() {
    super("Tidak memiliki akses. Silakan login ulang.");
  }
}

export class FriendlyError extends Error {}

/** Throw UnauthorizedError when no Supabase user session exists. */
export async function requireUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

/** Validate a numeric record id coming from client closures. */
export function validateId(id: number, label = "Data"): number {
  if (!Number.isInteger(id) || id <= 0) {
    throw new FriendlyError(`${label} tidak valid.`);
  }
  return id;
}

/**
 * Convert unknown errors to a safe user-facing message.
 * Internal Supabase/storage details are logged server-side only.
 */
export function toUserMessage(err: unknown, fallback: string): string {
  if (err instanceof UnauthorizedError) return err.message;
  if (err instanceof FriendlyError) return err.message;
  // Known friendly DB case (unique violation) is mapped by callers
  // via FriendlyError; everything else stays generic.
  console.error("Server action failed:", err);
  return fallback;
}
