import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
// TypeScript may complain about importing CSS without module declarations
// @ts-ignore
import "./globals.css";

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
});

const gothamFallback = Montserrat({
  variable: "--font-gotham",
  subsets: ["latin"],
  weight: ["700", "900"],
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
  metadataBase: new URL("https://mhmdfjr.vercel.app"),
  title: {
    default: "Mohamad Fajar | Full Stack Developer",
    template: "%s | Mohamad Fajar",
  },
  description:
    "Mohamad Fajar Nur Khasani is a full-stack developer who builds modern websites for digital solutions with Next.js, Laravel, and other modern technologies.",
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
    title: "Mohamad Fajar | Full Stack Developer",
    description:
      "Mohamad Fajar Nur Khasani is a full-stack developer who builds modern websites for digital solutions with Next.js, La.",
    url: "https://mhmdfjr.vercel.app",
    siteName: "Mohamad Fajar's Portfolio",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Fajar | Full Stack Developer",
    description:
      "Mohamad Fajar Nur Khasani is a full-stack developer who builds modern websites for digital solutions with Next.js, La.",
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
