import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, getProjects, getContacts } from "@/lib/database";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/organisms/FooterSection";
import { ProjectDetailSection } from "@/components/organisms/ProjectDetail";
import { ProjectRecommendationSection } from "@/components/organisms/ProjectRecommendation";

export const revalidate = 60;

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    return {};
  }

  const description = project.description.replace(/\s+/g, " ").slice(0, 160);
  const canonicalUrl = `https://mhmdfjr.vercel.app/project/${project.id}`;

  return {
    title: `${project.name} | Mohamad Fajar`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.name} | Mohamad Fajar`,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        { url: project.images?.[0] ?? "/logo.png", width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Mohamad Fajar`,
      description,
      images: [project.images?.[0] ?? "/logo.png"],
    },
  };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const contacts = await getContacts();
  const recommendations = allProjects
    .filter((item) => item.id !== project.id)
    .slice(0, 2);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `https://mhmdfjr.vercel.app/project/${project.id}`,
    author: {
      "@type": "Person",
      name: "Mohamad Fajar Nur Khasani",
    },
    keywords: project.techstack?.join(", ") ?? "web development",
  };

  return (
    <main>
      <Navbar />
      <ProjectDetailSection project={project} />
      <ProjectRecommendationSection recommendations={recommendations} />
      <FooterSection contacts={contacts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
    </main>
  );
}
