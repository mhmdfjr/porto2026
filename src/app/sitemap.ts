import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mhmdfjr.vercel.app";
  const projects = await getProjects();

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
