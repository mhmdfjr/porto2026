import { supabase } from "./supabase"
import type { Contact, Skill, Education, Work, Project, Organization } from "./supabase"

// Fetch contact information
export async function getContacts(): Promise<Contact[]> {
  try {
    const { data, error } = await supabase.from("contacts").select("*").order("name", { ascending: true })

    if (error) {
      console.error("Error fetching contacts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return []
  }
}

// Fetch all skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("name", { ascending: true })

    if (error) {
      console.error("Error fetching skills:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

// Fetch education history
export async function getEducations(): Promise<Education[]> {
  try {
    const { data, error } = await supabase.from("educations").select("*").order("start", { ascending: false })

    if (error) {
      console.error("Error fetching educations:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching educations:", error)
    return []
  }
}

// Fetch work experience
export async function getWorks(): Promise<Work[]> {
  try {
    const { data, error } = await supabase.from("works").select("*").order("start", { ascending: false })

    if (error) {
      console.error("Error fetching works:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching works:", error)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const { data, error } = await supabase.from("organizations").select("*").order("id", { ascending: false })

    if (error) {
      console.error("Error fetching organizations:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return []
  }
}

// Format date for display
export function formatDate(dateString?: string) {
  if (!dateString) return "Present"

  const date = new Date(dateString)
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
