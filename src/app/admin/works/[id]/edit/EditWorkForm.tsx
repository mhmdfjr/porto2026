"use client";

import { useRouter } from "next/navigation";
import type { Work } from "@/lib/supabase";
import { WorkForm } from "../../WorkForm";
import { updateWork } from "../../actions";
import type { WorkFormState } from "@/lib/validations/work";

export function EditWorkForm({ work }: { work: Work }) {
  const router = useRouter();

  async function action(state: WorkFormState, formData: FormData) {
    return updateWork(work.id, work.image, state, formData);
  }

  return (
    <WorkForm
      mode="edit"
      work={work}
      action={action}
      onSuccess={() => router.push("/admin/works")}
    />
  );
}
