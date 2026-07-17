import Link from "next/link";
import { getEducations } from "@/lib/database";
import { EducationsTable } from "./EducationsTable";

export default async function AdminEducationsPage() {
  const educations = await getEducations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Educations</h1>
        <Link
          href="/admin/educations/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Data
        </Link>
      </div>

      <EducationsTable educations={educations} />
    </div>
  );
}
