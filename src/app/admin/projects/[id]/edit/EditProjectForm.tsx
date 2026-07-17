"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/supabase";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "@/app/admin/projects/actions";
import type { ProjectFormState } from "@/lib/validations/project";

export function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  // existingImages di-track di ProjectForm lewat hidden input,
  // tapi supaya updateProject dapat array-nya, kita baca dari FormData di action wrapper ini.
  const [existingImages] = useState(project.images ?? []);

  async function action(state: ProjectFormState, formData: FormData) {
    const currentExisting = JSON.parse(
      (formData.get("existingImages") as string) || "[]",
    ) as string[];

    return updateProject(project.id, currentExisting, state, formData);
  }

  return (
    <ProjectForm
      mode="edit"
      project={project}
      action={action}
      onSuccess={() => router.push("/admin/projects")}
    />
  );
}
