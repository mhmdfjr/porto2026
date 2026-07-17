import { notFound } from "next/navigation";
import { getContactById } from "@/lib/database";
import { EditContactForm } from "./EditContactForm";

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContactById(Number(id));

  if (!contact) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Kontak</h1>
      <EditContactForm contact={contact} />
    </div>
  );
}
