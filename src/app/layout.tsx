import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://mhmdfjr.vercel.app"),
  title: {
    default: "Mohamad Fajar | Full Stack Developer",
    template: "%s | Mohamad Fajar",
  },
  description:
    "Mohamad Fajar Nur Khasani, a passionate Full-Stack Web Developer. I have valuable experience through work, training, education, and organizational activities related to technology.",
  keywords: [
    "full stack developer",
    "next.js developer",
    "portofolio",
    "Mohamad Fajar",
  ],
  authors: [{ name: "Mohamad Fajar" }],
  openGraph: {
    title: "Mohamad Fajar | Full Stack Developer",
    description:
      "Mohamad Fajar Nur Khasani, a passionate Full-Stack Web Developer. I have valuable experience through work, training, education, and organizational activities related to technology.",
    url: "https://mhmdfjr.vercel.app",
    siteName: "Mohamad Fajar's Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Fajar | Full Stack Developer",
    description:
      "Mohamad Fajar Nur Khasani, a passionate Full-Stack Web Developer. I have valuable experience through work, training, education, and organizational activities related to technology.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        {children}
      </body>
    </html>
  );
}
