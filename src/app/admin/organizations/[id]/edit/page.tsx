import { notFound } from "next/navigation";
import { getOrganizationById } from "@/lib/database";
import { EditOrganizationForm } from "./EditOrganizationForm";

export default async function EditOrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organization = await getOrganizationById(Number(id));

  if (!organization) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Organisasi</h1>
      <EditOrganizationForm organization={organization} />
    </div>
  );
}
