type Props = {
  pending: boolean;
  mode: "create" | "edit";
  createLabel: string;
  editLabel?: string;
};

export function SubmitButton({ pending, mode, createLabel, editLabel }: Props) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-white py-2 font-semibold text-black disabled:opacity-50"
    >
      {pending ? "Menyimpan..." : mode === "create" ? createLabel : (editLabel ?? "Simpan Perubahan")}
    </button>
  );
}
