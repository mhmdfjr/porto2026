"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { loginSchema } from "@/lib/validations/auth"
import {
  checkLoginAttempt,
  resetLoginAttempt,
} from "@/lib/rate-limit"

const GENERIC_MESSAGE = "Email atau password salah";

async function getClientKey(email: string): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || "unknown"
  return `${ip}:${email}`
}

export async function login(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    redirect(`/login?message=${encodeURIComponent(GENERIC_MESSAGE)}`)
  }

  const key = await getClientKey(parsed.data.email)
  const attempt = checkLoginAttempt(key)

  if (!attempt.allowed) {
    redirect(
      `/login?message=${encodeURIComponent(
        `Terlalu banyak percobaan. Coba lagi dalam ${attempt.retryAfterSeconds} detik.`,
      )}`,
    )
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    redirect(`/login?message=${encodeURIComponent(GENERIC_MESSAGE)}`)
  }

  resetLoginAttempt(key)
  redirect("/admin")
}
