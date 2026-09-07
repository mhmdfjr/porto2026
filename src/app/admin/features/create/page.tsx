"use client";

import { useRouter } from "next/navigation";
import { FeatureForm } from "../FeatureForm";
import { createFeature } from "../actions";

export default function CreateFeaturePage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Feature</h1>
      <FeatureForm
        mode="create"
        action={createFeature}
        onSuccess={() => router.push("/admin/features")}
      />
    </div>
  );
}
