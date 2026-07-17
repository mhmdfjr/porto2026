import Link from "next/link";
import { getSkills } from "@/lib/database";
import { SkillsTable } from "./SkillsTable";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <Link
          href="/admin/skills/create"
          className="rounded bg-white px-4 py-2 font-semibold text-black"
        >
          + Tambah Skill
        </Link>
      </div>

      <SkillsTable skills={skills} />
    </div>
  );
}
