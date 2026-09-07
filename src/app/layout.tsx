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
  name: "Mohamad Fajar Nur Khasani",
  alternateName: "Mohamad Fajar",
  jobTitle: "Full-Stack Developer",
  url: "https://mhmdfjr.vercel.app",
  sameAs: [
    "https://linkedin.com/in/mohamadfajarnurkhasani",
    "https://github.com/mhmdfjr",
    "https://instagram.com/holy.jar_",
  ],
  description:
    "Full-stack web developer focused on building modern, responsive, and performant web experiences.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Mohamad Fajar",
  },
  description: siteConfig.description,
  keywords: [
    "full stack developer",
    "next.js developer",
    "portfolio developer",
    "Mohamad Fajar",
    "developer Indonesia",
  ],
  authors: [{ name: "Mohamad Fajar" }],
  alternates: {
    canonical: "https://mhmdfjr.vercel.app",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Mohamad Fajar's Portfolio",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/logo.png"],
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
        {children}
      </body>
    </html>
  );
}
