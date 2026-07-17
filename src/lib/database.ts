import { supabase } from "./supabase"
import type { Contact, Skill, Education, Work, Project, Organization } from "./supabase"

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

export async function getContactById(id: number): Promise<Contact | null> {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching contact with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error)
    return null
  }
}

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

// Fetch specific skill by ID
export async function getSkillById(id: number): Promise<Skill | null> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching skill with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching skill with id ${id}:`, error)
    return null
  }
}

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

export async function getEducationById(id: number): Promise<Education | null> {
  try {
    const { data, error } = await supabase
      .from("educations")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching education with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching education with id ${id}:`, error)
    return null
  }
}

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

export async function getWorkById(id: number): Promise<Work | null> {
  try {
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching work with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching work with id ${id}:`, error)
    return null
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

// Fetch specific project by ID
export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching project with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error)
    return null
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

export async function getOrganizationById(id: number): Promise<Organization | null> {
  try {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching organization with id ${id}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching organization with id ${id}:`, error)
    return null
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
