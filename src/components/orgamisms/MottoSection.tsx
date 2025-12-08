import React from "react";
import Image from "next/image";

// Gambar Background: Street/Crowd dengan efek motion blur (sesuai referensi)
const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=80&w=2000&auto=format&fit=crop";

interface MottoSectionProps {
  text?: string;
}

export const MottoSection = ({
  text = "Cast of characters",
}: MottoSectionProps) => {
  return (
    <section
      id="motto"
      className="relative w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND IMAGE --- */}
      {/* Menggunakan grayscale dan sedikit blur untuk fokus ke teks */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BANNER_IMAGE}
          alt="Street Background"
          fill
          className="object-cover grayscale brightness-75"
          priority
        />
      </div>

      {/* --- CONTENT (RED BOX) --- */}
      <div className="relative z-10 p-4 w-full flex justify-center">
        <div className="flex gap-4 justify-center items-center bg-brand-red px-6 py-4 md:px-12 md:py-8 shadow-2xl transform transition-transform duration-500 hover:rotate-2 hover:scale-105">
          <div className="transition-transform hover:rotate-45 duration-500 select-none">
            <Image
              src="/sun-black.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-spin-slow object-contain w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
            />
          </div>
          <h2 className="font-gotham font-black text-brand-black text-3xl md:text-5xl lg:text-7xl uppercase tracking-tighter text-center">
            {text}
          </h2>
        </div>
      </div>
    </section>
  );
};
