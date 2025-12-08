import React from "react";
import Image from "next/image";
import Link from "next/link";

// Gambar Ilustrasi Footer (Komunikasi/Orang)
// Placeholder menggunakan gambar portrait orang/lifestyle
const FOOTER_IMAGE =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";

export const FooterSection = () => {
  return (
    <footer
      id="footer"
      className="relative w-full bg-brand-red pt-4 pb-4 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* --- LEFT COLUMN: Heading & Image --- */}
        <div className="flex-1 flex flex-col gap-8 md:gap-10">
          {/* Big Heading "Thank you" */}
          <h2 className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none">
            Thank you
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-12 md:gap-20">
          <div className="relative w-full md:max-w-1/2 aspect-video bg-brand-yellow/10">
            <Image
              src={FOOTER_IMAGE}
              alt="Thank you visual"
              fill
              className="object-cover grayscale contrast-125 opacity-90"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-2 md:gap-4 md:pl-8">
            {/* Contact Item 1: Email */}
            <div className="flex flex-col gap-2">
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Email
              </span>
              <Link
                href="mailto:moh.fajar1304@gmail.com"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                moh.fajar1304@gmail.com
              </Link>
            </div>

            {/* Contact Item 2: Social Media */}
            <div className="flex flex-col gap-1">
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Social media
              </span>
              <Link
                href="https://instagram.com/holy.jar_"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                @holy.jar_
              </Link>
            </div>

            {/* Contact Item 3: Phone */}
            <div className="flex flex-col gap-1">
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Phone
              </span>
              <Link
                href="https://wa.me/6285700072350"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                +62 857-0007-2350
              </Link>
            </div>
          </div>

          <div className="transition-transform hover:rotate-45 duration-500 select-none">
            <Image
              src="/sun-yellow.svg" // Pastikan file ini ada di folder public/
              alt="Decorative Sun"
              width={100}
              height={100}
              className="object-contain w-10 h-10 md:w-30 md:h-30 lg:w-32 lg:h-32"
            />
          </div>
        </div>
      </div>

      {/* Copyright Kecil (Opsional, di paling bawah) */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-brand-yellow">
        <p className="font-dm text-brand-yellow text-sm text-center md:text-left">
          © {new Date().getFullYear()} Mohamad Fajar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
