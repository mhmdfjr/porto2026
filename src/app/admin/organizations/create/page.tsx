"use client";

import { useRouter } from "next/navigation";
import { OrganizationForm } from "../OrganizationForm";
import { createOrganization } from "../actions";

export default function CreateOrganizationPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Organisasi</h1>
      <OrganizationForm
        mode="create"
        action={createOrganization}
        onSuccess={() => router.push("/admin/organizations")}
      />
    </div>
  );
}
