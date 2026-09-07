import { supabase } from "./supabase"
import type { Contact, Skill, Feature, Education, Work, Project, Organization, Post } from "./supabase"

/**
 * NOTE: these reads use the public anon client and therefore rely
 * on Supabase RLS policies (public read, authenticated write).
 * Admin mutations in app/admin/** use the SSR server client
 * with an explicit requireUser() check instead.
 */

type OrderBy = { column: string; ascending: boolean };

async function fetchList<T>(table: string, order: OrderBy): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(order.column, { ascending: order.ascending });

    if (error) {
      console.error(`Error fetching ${table}:`, error);
      return [];
    }

    return (data ?? []) as T[];
  } catch (error) {
    console.error(`Error fetching ${table}:`, error);
    return [];
  }
}

async function fetchById<T>(table: string, id: number): Promise<T | null> {
  if (!Number.isInteger(id) || id <= 0) return null;
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching ${table} with id ${id}:`, error);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error(`Error fetching ${table} with id ${id}:`, error);
    return null;
  }
}

export function getContacts(): Promise<Contact[]> {
  return fetchList<Contact>("contacts", { column: "name", ascending: true });
}

export function getContactById(id: number): Promise<Contact | null> {
  return fetchById<Contact>("contacts", id);
}

export function getSkills(): Promise<Skill[]> {
  return fetchList<Skill>("skills", { column: "name", ascending: true });
}

// Fetch specific skill by ID
export function getSkillById(id: number): Promise<Skill | null> {
  return fetchById<Skill>("skills", id);
}

export function getFeatures(): Promise<Feature[]> {
  return fetchList<Feature>("features", { column: "id", ascending: true });
}

export function getFeatureById(id: number): Promise<Feature | null> {
  return fetchById<Feature>("features", id);
}

export function getEducations(): Promise<Education[]> {
  return fetchList<Education>("educations", { column: "start", ascending: false });
}

export function getEducationById(id: number): Promise<Education | null> {
  return fetchById<Education>("educations", id);
}

export function getWorks(): Promise<Work[]> {
  return fetchList<Work>("works", { column: "start", ascending: false });
}

export function getWorkById(id: number): Promise<Work | null> {
  return fetchById<Work>("works", id);
}

export function getProjects(): Promise<Project[]> {
  return fetchList<Project>("projects", { column: "id", ascending: false });
}

// Fetch specific project by ID
export function getProjectById(id: number): Promise<Project | null> {
  return fetchById<Project>("projects", id);
}

export function getOrganizations(): Promise<Organization[]> {
  return fetchList<Organization>("organizations", { column: "id", ascending: false });
}

export function getOrganizationById(id: number): Promise<Organization | null> {
  return fetchById<Organization>("organizations", id);
}

// --- Blog posts ---

/** All posts for admin (draft + published). */
export function getAllPosts(): Promise<Post[]> {
  return fetchList<Post>("posts", { column: "updated_at", ascending: false });
}

export function getPostById(id: number): Promise<Post | null> {
  return fetchById<Post>("posts", id);
}

/** Published posts for public pages, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching published posts:", error);
      return [];
    }

    return (data ?? []) as Post[];
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const clean = slug.trim().toLowerCase();
  if (!clean || clean.length > 120) return null;
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", clean)
      .eq("status", "published")
      .single();

    if (error) {
      console.error(`Error fetching post ${clean}:`, error);
      return null;
    }

    return data as Post;
  } catch (error) {
    console.error(`Error fetching post ${clean}:`, error);
    return null;
  }
}

// Format date for display
export function formatDate(dateString?: string) {
  if (!dateString) return "Present"

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "Invalid date"
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

// Format date range for work/education
export function formatDateRange(start: string, end?: string) {
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : "Present"

  return `${startFormatted} - ${endFormatted}`
}
