import Link from "next/link";
import { getProjects } from "@/lib/database";
import { ProjectsTable } from "@/app/admin/projects/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
