"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSkills } from "@/lib/database";
import type { Skill } from "@/lib/supabase";

const SKILL_IMAGE_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";

export const SkillSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsData = await getSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error("Error loading skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  // --- LOGIC PERBAIKAN ---
  // Kita mapping dulu untuk ambil 'name', baru di-join
  const skillsString = skills.map((skill) => skill.name).join(", ");

  return (
    <section
      id="skill"
      className="relative w-full min-h-screen flex flex-col md:flex-row-reverse bg-brand-red overflow-hidden"
    >
      {/* --- GRID GAMBAR (Logic Zig-Zag) --- */}
      <div className="w-full h-64 md:h-auto md:w-1/3 lg:w-[30%] grid grid-cols-4 md:grid-cols-2">
        {[...Array(8)].map((_, index) => {
          // 1. LOGIKA ZIG-ZAG MOBILE (4 Kolom) -> Pola: X O X O
          const isMobileImage = (Math.floor(index / 4) + index) % 2 === 0;

          // 2. LOGIKA ZIG-ZAG DESKTOP (2 Kolom) -> Pola: X O
          const isDesktopImage = (Math.floor(index / 2) + index) % 2 === 0;

          return (
            <div
              key={index}
              className="relative w-full h-full aspect-square md:aspect-auto"
            >
              {/* --- GAMBAR --- */}
              <div
                className={`w-full h-full relative
                  ${isMobileImage ? "block" : "hidden"}
                  ${isDesktopImage ? "md:block" : "md:hidden"}`}
              >
                <Image
                  src={SKILL_IMAGE_URL}
                  alt="Skill Portrait"
                  fill
                  className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </div>

              {/* --- KOTAK MERAH (SPACER) --- */}
              <div
                className={`w-full h-full bg-brand-red
                  ${!isMobileImage ? "block" : "hidden"}
                  ${!isDesktopImage ? "md:block" : "md:hidden"}`}
              />
            </div>
          );
        })}
      </div>

      {/* --- AREA KONTEN TEKS --- */}
      <div className="flex-1 relative flex flex-col justify-center items-start p-8 md:p-16 lg:p-16">
        <h2 className="absolute top-8 left-6 md:top-12 md:left-12 font-gotham font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl tracking-tighter">
          Skills
        </h2>

        <div className="max-w-3xl min-h-[100px] flex items-center">
          {/* Tampilkan Loading State atau Data */}
          {loading ? (
            <p className="font-dm text-brand-yellow/50 text-2xl md:text-3xl lg:text-4xl animate-pulse">
              Loading skills...
            </p>
          ) : (
            <p className="font-dm text-brand-yellow text-2xl md:text-3xl lg:text-4xl leading-relaxed text-left font-medium">
              {/* Fallback jika data kosong */}
              {skillsString ? `“${skillsString}, ”` : "“No skills added yet.”"}
            </p>
          )}
        </div>

        {/* Dekorasi Matahari Kuning */}
        <div className="absolute bottom-0 right-0 transition-transform hover:rotate-45 duration-500 select-none p-8 md:p-0">
          <Image
            src="/sun-yellow.svg"
            alt="Decorative Sun"
            width={100}
            height={100}
            className="object-contain w-32 h-32 md:w-64 md:h-64 lg:w-[200px] lg:h-[200px]"
          />
        </div>
      </div>
    </section>
  );
};
