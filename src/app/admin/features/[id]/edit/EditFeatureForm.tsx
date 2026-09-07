"use client";

import { useRouter } from "next/navigation";
import type { Feature } from "@/lib/supabase";
import { FeatureForm } from "../../FeatureForm";
import { updateFeature } from "../../actions";
import type { FeatureFormState } from "@/lib/validations/feature";

export function EditFeatureForm({ feature }: { feature: Feature }) {
  const router = useRouter();

  async function action(state: FeatureFormState, formData: FormData) {
    return updateFeature(feature.id, state, formData);
  }

  return (
    <FeatureForm
      mode="edit"
      feature={feature}
      action={action}
      onSuccess={() => router.push("/admin/features")}
    />
  );
}
