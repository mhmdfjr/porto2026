import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, getProjects, getContacts } from "@/lib/database";
import { siteConfig } from "@/lib/config";
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
  const canonicalUrl = `${siteConfig.url}/project/${project.id}`;
  const ogImage = project.images?.[0] ?? `${siteConfig.url}/opengraph-image`;

  return {
    title: project.name,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.name} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${siteConfig.name}`,
      description,
      images: [ogImage],
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
    .slice(0, 3);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: project.images?.[0],
    datePublished: project.created_at,
    url: `${siteConfig.url}/project/${project.id}`,
    mainEntityOfPage: `${siteConfig.url}/project/${project.id}`,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Mohamad Fajar Nur Khasani",
      url: siteConfig.url,
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
