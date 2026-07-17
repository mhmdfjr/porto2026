"use client";

import { useRouter } from "next/navigation";
import { ProjectForm } from "@/app/admin/projects/ProjectForm";
import { createProject } from "../actions";

export default function CreateProjectPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Project</h1>
      <ProjectForm
        mode="create"
        action={createProject}
        onSuccess={() => router.push("/admin/projects")}
      />
    </div>
  );
}
