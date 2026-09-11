import type { MetadataRoute } from "next";
import { getProjects, getPublishedPosts } from "@/lib/database";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

function toDate(value: string | null | undefined): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const [projects, posts] = await Promise.all([
    getProjects(),
    getPublishedPosts(),
  ]);

  const projectEntries = projects
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: toDate(project.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const postEntries = posts
    .filter((post) => Boolean(post.slug) && post.status === "published")
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: toDate(
        post.updated_at ?? post.published_at ?? post.created_at,
      ),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectEntries,
    ...postEntries,
  ];
}
