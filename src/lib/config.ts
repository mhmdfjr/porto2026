/**
 * NOTE: always use literal process.env.NEXT_PUBLIC_* access here.
 * Next.js statically inlines NEXT_PUBLIC vars into client chunks only
 * for literal member access — dynamic process.env[name] is NOT inlined
 * and evaluates to undefined in the browser.
 */
function supabasePublicBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_SUPABASE_URL",
    );
  }
  return value;
}

export const siteConfig = {
  url: "https://mhmdfjr.vercel.app",
  name: "Mohamad Fajar",
  title: "Mohamad Fajar | Full Stack Developer",
  description:
    "Mohamad Fajar Nur Khasani is a full-stack developer who builds modern websites for digital solutions with Next.js, Laravel, and other modern technologies.",
  locale: "id_ID",
  ogImage: "/logo.png",
} as const;

export const storageConfig = {
  bucket: "porto",
  folders: {
    projects: "Projects",
    works: "Works",
    educations: "Educations",
    organizations: "Organizations",
    posts: "Posts",
    skills: "Skills",
  },
  // SVG allowed but ALWAYS sanitized server-side (see lib/storage.ts):
  // raw SVG can carry <script>/event handlers (stored XSS).
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ],
  allowedExtensions: ["jpg", "jpeg", "png", "webp", "svg"],
  maxFileSizeBytes: 2 * 1024 * 1024, // 2 MB
  maxFilesPerRecord: 5,
} as const;

/** accept attribute for admin file inputs — single source of truth. */
export const IMAGE_INPUT_ACCEPT = storageConfig.allowedMimeTypes.join(",");

export function publicStorageUrl(path: string): string {
  return `${supabasePublicBaseUrl()}/storage/v1/object/public/porto/${path}`;
}

/**
 * Media URLs used by homepage sections. Supabase-hosted assets are
 * built from NEXT_PUBLIC_SUPABASE_URL so the project ref lives in
 * one place (.env) instead of copy-pasted literals.
 */
export const mediaConfig = {
  heroImage:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
  profileBack: publicStorageUrl("Me/me7.jpeg"),
  profileFront: publicStorageUrl("Me/me9.png"),
  cvUrl: publicStorageUrl(
    "CV/CV%20Mohamad%20Fajar%20Nur%20Khasani%20(Aug%202026).pdf",
  ),
  footerImage: publicStorageUrl("Me/me6.JPG"),
  skillImage: publicStorageUrl("nature4.jpg"),
  quoteImages: [
    publicStorageUrl("art1.jpg"),
    publicStorageUrl("building1.jpg"),
    publicStorageUrl("cafe1.jpg"),
  ],
  galleryFallback: publicStorageUrl("nature10.jpg"),
} as const;
