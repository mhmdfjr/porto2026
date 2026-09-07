// SERVER-ONLY: never import from a "use client" component.
// Dynamic process.env[name] is not inlined into client chunks
// (only literal process.env.NEXT_PUBLIC_* access is).
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Check .env.local (see .env.example).`,
    );
  }
  return value;
}

export const env = {
  supabaseUrl: () => getEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: () => getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  unsplashAccessKey: () => getEnv("UNSPLASH_ACCESS_KEY"),
};
