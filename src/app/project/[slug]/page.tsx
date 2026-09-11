import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getContacts, getApprovedComments } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/organisms/FooterSection";
import { ProjectDetailSection } from "@/components/organisms/ProjectDetail";
import { CommentSection } from "@/components/organisms/CommentSection";

export const revalidate = 60;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const description = project.description.replace(/\s+/g, " ").slice(0, 160);
  const canonicalUrl = `${siteConfig.url}/project/${project.slug}`;
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
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const contacts = await getContacts();
  const comments = await getApprovedComments("project", project.slug);
  const recommendations = allProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: project.images?.[0],
    datePublished: project.created_at,
    url: `${siteConfig.url}/project/${project.slug}`,
    mainEntityOfPage: `${siteConfig.url}/project/${project.slug}`,
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
      <ProjectDetailSection project={project} recommendations={recommendations} />
      <CommentSection targetType="project" targetSlug={project.slug} comments={comments} />
      <FooterSection contacts={contacts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
    </main>
  );
}
