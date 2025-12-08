import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google"; // Montserrat sebagai fallback Gotham
import localFont from "next/font/local";
import "./globals.css";

// Setup DM Sans (Teks Tipis/Body)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const gotham = localFont({
  src: [
    {
      path: "./fonts/Gotham-Bold.ttf", // Sesuaikan nama file Anda
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gotham", // Nama variabel CSS
  display: "swap",
});

// Setup Fallback Gotham (Montserrat)
const gothamFallback = Montserrat({
  variable: "--font-gotham",
  subsets: ["latin"],
  weight: ["700", "900"], // Gotham identik dengan Bold/Black
});

export const metadata: Metadata = {
  title: "Portofolio Profesional",
  description: "Web Portofolio",
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
