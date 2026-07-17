import { notFound } from "next/navigation";
import { getEducationById } from "@/lib/database";
import { EditEducationForm } from "./EditEducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await getEducationById(Number(id));

  if (!education) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Pendidikan</h1>
      <EditEducationForm education={education} />
    </div>
  );
}
