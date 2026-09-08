import type { Metadata } from "next";
import { getProjects, getContacts } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { FooterSection } from "@/components/organisms/FooterSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: `Koleksi project ${siteConfig.name} — aplikasi web modern yang dibangun dengan Next.js, Laravel, dan teknologi terkini.`,
  alternates: { canonical: `${siteConfig.url}/project` },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Koleksi project ${siteConfig.name} — aplikasi web modern.`,
    url: `${siteConfig.url}/project`,
    type: "website",
  },
};

export default async function ProjectsPage() {
  const [projects, contacts] = await Promise.all([
    getProjects(),
    getContacts(),
  ]);

  return (
    <main className="bg-brand-black text-white">
      <Navbar />
      <section className="w-full mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            My random craft
          </h1>
          <p className="font-bold text-brand-red">
            Let's go check out some of my fun project collections
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="mt-12 font-dm text-brand-red text-lg">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                description={project.description}
                tags={project.techstack}
                live_url={project.live_url || null}
                imageUrl={project.images?.[0] ?? null}
              />
            ))}
          </div>
        )}
      </section>
      <FooterSection contacts={contacts} />
    </main>
  );
}
