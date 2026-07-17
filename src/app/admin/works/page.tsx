import Link from "next/link";
import { getWorks } from "@/lib/database";
import { WorksTable } from "./WorksTable";

export default async function AdminWorksPage() {
  const works = await getWorks();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Work Experience</h1>
        <Link
          href="/admin/works/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Data
        </Link>
      </div>

      <WorksTable works={works} />
    </div>
  );
}
