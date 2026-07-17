import Link from "next/link";
import { getOrganizations } from "@/lib/database";
import { OrganizationsTable } from "./OrganizationsTable";

export default async function AdminOrganizationsPage() {
  const organizations = await getOrganizations();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Organizations</h1>
        <Link
          href="/admin/organizations/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Data
        </Link>
      </div>

      <OrganizationsTable organizations={organizations} />
    </div>
  );
}
