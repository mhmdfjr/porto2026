"use client";

import { useRouter } from "next/navigation";
import { WorkForm } from "../WorkForm";
import { createWork } from "../actions";

export default function CreateWorkPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Pengalaman Kerja</h1>
      <WorkForm
        mode="create"
        action={createWork}
        onSuccess={() => router.push("/admin/works")}
      />
    </div>
  );
}
