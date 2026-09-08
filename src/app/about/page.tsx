import type { Metadata } from "next";
import { getEducations, getOrganizations, getContacts, getAbout } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { EducationSection } from "@/components/organisms/EducationSection";
import { OrganizationSection } from "@/components/organisms/OrganizationSection";
import { FooterSection } from "@/components/organisms/FooterSection";
import { AboutHero } from "./AboutHero";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `Riwayat pendidikan dan organisasi ${siteConfig.name} — latar belakang akademis dan pengalaman komunitas di bidang teknologi.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `Riwayat pendidikan dan organisasi ${siteConfig.name}.`,
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

export default async function AboutPage() {
  const [educations, organizations, contacts, about] = await Promise.all([
    getEducations(),
    getOrganizations(),
    getContacts(),
    getAbout(),
  ]);

  return (
    <main className="bg-brand-black text-white">
      <Navbar />
      <div className="pt-20">
        <AboutHero about={about} />
        <EducationSection educations={educations} />
        <OrganizationSection organizations={organizations} />
      </div>
      <FooterSection contacts={contacts} />
    </main>
  );
}
