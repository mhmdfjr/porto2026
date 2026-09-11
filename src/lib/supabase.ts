import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Pengecekan agar tidak crash jika env belum diload
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase Environment Variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for your database tables
export interface Contact {
  id: number;
  name: string;
  url: string;
  icon: string;
  username: string;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  logo: string | null;
  created_at: string;
}

export interface Feature {
  id: number;
  feature: string;
  description: string;
  created_at: string;
}

export interface About {
  id: number;
  name: string;
  role: string;
  age: number | string;
  address: string;
  description: string;
  created_at: string;
}

export interface Education {
  id: number;
  name: string;
  major: string;
  location?: string;
  start: string;
  end?: string;
  image: string;
  created_at: string;
}

export interface Work {
  id: number;
  company: string;
  role: string;
  location: string;
  start: string;
  end?: string;
  image: string;
  created_at: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  techstack: string[];
  images: string[];
  live_url?: string;
  code_url?: string;
  created_at: string;
}

export interface Organization {
  id: number;
  name: string;
  location: string;
  year: string[];
  role: string[];
  image: string;
  created_at: string;
}

export type CommentTarget = "post" | "project";
export type CommentStatus = "pending" | "approved" | "rejected";

export interface Comment {
  id: number;
  target_type: CommentTarget;
  target_slug: string;
  name: string;
  message: string;
  status: CommentStatus;
  created_at: string;
}

export type PostStatus = "draft" | "published";

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content_json: Record<string, unknown>;
  content_html: string;
  cover_image: string | null;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
