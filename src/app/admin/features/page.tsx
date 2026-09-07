import { getFeatures } from "@/lib/database";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FeaturesTable } from "./FeaturesTable";

export default async function AdminFeaturesPage() {
  const features = await getFeatures();

  return (
    <div>
      <AdminPageHeader
        title="Manage Features"
        createHref="/admin/features/create"
        createLabel="+ Tambah Feature"
      />
      <FeaturesTable features={features} />
    </div>
  );
}
