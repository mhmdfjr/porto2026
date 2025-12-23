import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Pengecekan agar tidak crash jika env belum diload
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase Environment Variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export interface Contact {
  id: number
  name: string
  url: string
  icon: string
  created_at: string
}

export interface Skill {
  id: number
  name: string
  created_at: string
}

export interface Education {
  id: number
  name: string
  major: string
  location?: string
  start: string
  end?: string
  image: string
  created_at: string
}

export interface Work {
  id: number
  company: string
  role: string
  location: string
  start: string
  end?: string
  image: string
  created_at: string
}

export interface Project {
  id: number
  name: string
  description: string
  placeholder: string
  techstack: string[]
  image: string[]
  live_url?: string
  code_url?: string
  created_at: string
}

export interface Organization {
  id: number
  name: string
  location: string
  year: string[]
  role: string[]
  image: string
  created_at: string
}