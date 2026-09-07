import { notFound } from "next/navigation";
import { getFeatureById } from "@/lib/database";
import { EditFeatureForm } from "./EditFeatureForm";

export default async function EditFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = await getFeatureById(Number(id));

  if (!feature) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Feature</h1>
      <EditFeatureForm feature={feature} />
    </div>
  );
}
