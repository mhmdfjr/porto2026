"use client";

import { useRouter } from "next/navigation";
import { SkillForm } from "../SkillForm";
import { createSkill } from "../actions";

export default function CreateSkillPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Skill</h1>
      <SkillForm
        mode="create"
        action={createSkill}
        onSuccess={() => router.push("/admin/skills")}
      />
    </div>
  );
}
