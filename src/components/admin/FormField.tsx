import type { ReactNode } from "react";

type Props = {
  label: string;
  error?: string;
  children: ReactNode;
};

export const fieldInputClass =
  "mt-1 w-full rounded bg-neutral-800 p-2 text-white";

/** Shared field wrapper: label + control + validation error. */
export function FormField({ label, error, children }: Props) {
  return (
    <div>
      <label className="text-sm text-neutral-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
