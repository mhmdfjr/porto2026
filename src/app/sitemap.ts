import type { MetadataRoute } from "next";
import { getProjects, getPublishedPosts } from "@/lib/database";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const projects = await getProjects();
  const posts = await getPublishedPosts();

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectEntries,
    ...postEntries,
  ];
}
