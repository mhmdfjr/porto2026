import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const gotham = localFont({
  src: [
    {
      path: "./fonts/Gotham-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: "Mohamad Fajar Nur Khasani",
  alternateName: ["Mohamad Fajar", "mhmdfjr"],
  jobTitle: "Full-Stack Developer",
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  nationality: "Indonesian",
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "Full-Stack Web Development",
  ],
  sameAs: [
    "https://linkedin.com/in/mohamadfajarnurkhasani",
    "https://github.com/mhmdfjr",
    "https://instagram.com/holy.jar_",
  ],
  description:
    "Mohamad Fajar Nur Khasani is a full-stack developer focused on building modern, responsive, and performant web experiences with Next.js and Laravel.",
  mainEntityOfPage: siteConfig.url,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: "Mohamad Fajar Nur Khasani | Full-Stack Developer",
  inLanguage: "id-ID",
  publisher: { "@id": `${siteConfig.url}/#person` },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Mohamad Fajar Nur Khasani",
  },
  description: siteConfig.description,
  keywords: [
    "Mohamad Fajar Nur Khasani",
    "Mohamad Fajar",
    "mhmdfjr",
    "full stack developer",
    "full-stack developer Indonesia",
    "next.js developer",
    "laravel developer",
    "portfolio developer",
    "developer Indonesia",
  ],
  authors: [{ name: "Mohamad Fajar Nur Khasani", url: siteConfig.url }],
  creator: "Mohamad Fajar Nur Khasani",
  publisher: "Mohamad Fajar Nur Khasani",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Mohamad Fajar Nur Khasani | Portfolio",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Mohamad Fajar Nur Khasani - Full-Stack Developer",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
  },
  other: {
    "google-site-verification": "rOC6CNwFqAXBMF-NY_LVMjg2BNyslgFuZlFCGx23qHs",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${gotham.variable} antialiased bg-brand-black text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
