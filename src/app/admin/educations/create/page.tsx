"use client";

import { useRouter } from "next/navigation";
import { EducationForm } from "../EducationForm";
import { createEducation } from "../actions";

export default function CreateEducationPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Pendidikan</h1>
      <EducationForm
        mode="create"
        action={createEducation}
        onSuccess={() => router.push("/admin/educations")}
      />
    </div>
  );
}
