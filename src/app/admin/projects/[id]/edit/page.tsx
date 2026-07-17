import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/database";
import { EditProjectForm } from "@/app/admin/projects/[id]/edit/EditProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Project</h1>
      <EditProjectForm project={project} />
    </div>
  );
}
