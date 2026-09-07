"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "./ConfirmDialog";

type DeleteResult = { success: boolean; message: string };

type Props = {
  /** Item label shown in the confirm dialog, e.g. project name. */
  itemLabel: string;
  onDelete: () => Promise<DeleteResult>;
};

/** Delete button with custom confirm dialog + transition + toast. */
export function DeleteButton({ itemLabel, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await onDelete();
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded bg-red-500/10 px-3 py-1 text-red-400 hover:bg-red-500/20"
      >
        Delete
      </button>
      <ConfirmDialog
        open={open}
        title={`Hapus "${itemLabel}"?`}
        description="Data yang dihapus tidak bisa dikembalikan."
        pending={isPending}
        onCancel={() => !isPending && setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
