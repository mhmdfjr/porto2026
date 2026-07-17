import { notFound } from "next/navigation";
import { getWorkById } from "@/lib/database";
import { EditWorkForm } from "./EditWorkForm";

export default async function EditWorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = await getWorkById(Number(id));

  if (!work) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Pengalaman Kerja</h1>
      <EditWorkForm work={work} />
    </div>
  );
}
