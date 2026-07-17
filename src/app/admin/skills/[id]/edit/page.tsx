import { notFound } from "next/navigation";
import { getSkillById } from "@/lib/database";
import { EditSkillForm } from "./EditSkillForm";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillById(Number(id));

  if (!skill) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Skill</h1>
      <EditSkillForm skill={skill} />
    </div>
  );
}
