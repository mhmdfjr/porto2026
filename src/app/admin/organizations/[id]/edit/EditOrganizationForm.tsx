"use client";

import { useRouter } from "next/navigation";
import type { Organization } from "@/lib/supabase";
import { OrganizationForm } from "../../OrganizationForm";
import { updateOrganization } from "../../actions";
import type { OrganizationFormState } from "@/lib/validations/organization";

export function EditOrganizationForm({
  organization,
}: {
  organization: Organization;
}) {
  const router = useRouter();

  async function action(state: OrganizationFormState, formData: FormData) {
    return updateOrganization(
      organization.id,
      organization.image,
      state,
      formData,
    );
  }

  return (
    <OrganizationForm
      mode="edit"
      organization={organization}
      action={action}
      onSuccess={() => router.push("/admin/organizations")}
    />
  );
}
