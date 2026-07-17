"use client";

import { useRouter } from "next/navigation";
import type { Skill } from "@/lib/supabase";
import { SkillForm } from "../../SkillForm";
import { updateSkill } from "../../actions";
import type { SkillFormState } from "@/lib/validations/skill";

export function EditSkillForm({ skill }: { skill: Skill }) {
  const router = useRouter();

  async function action(state: SkillFormState, formData: FormData) {
    return updateSkill(skill.id, state, formData);
  }

  return (
    <SkillForm
      mode="edit"
      skill={skill}
      action={action}
      onSuccess={() => router.push("/admin/skills")}
    />
  );
}
