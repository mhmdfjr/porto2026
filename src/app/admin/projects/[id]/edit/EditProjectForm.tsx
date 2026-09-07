"use client";

import { useRouter } from "next/navigation";
import type { Project } from "@/lib/supabase";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "@/app/admin/projects/actions";
import type { ProjectFormState } from "@/lib/validations/project";

export function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  async function action(state: ProjectFormState, formData: FormData) {
    return updateProject(project.id, [], state, formData);
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
