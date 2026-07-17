"use client";

import { useRouter } from "next/navigation";
import type { Education } from "@/lib/supabase";
import { EducationForm } from "../../EducationForm";
import { updateEducation } from "../../actions";
import type { EducationFormState } from "@/lib/validations/education";

export function EditEducationForm({ education }: { education: Education }) {
  const router = useRouter();

  async function action(state: EducationFormState, formData: FormData) {
    return updateEducation(education.id, education.image, state, formData);
  }

  return (
    <EducationForm
      mode="edit"
      education={education}
      action={action}
      onSuccess={() => router.push("/admin/educations")}
    />
  );
}
