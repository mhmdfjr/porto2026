"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { mediaConfig } from "@/lib/config";
import { SkillBadge } from "../molecules/SkillBadge";
import type { Skill } from "@/lib/supabase";

export const SkillSection = ({
  skills,
  image,
}: {
  skills: Skill[];
  image?: string;
}) => {
  const SKILL_IMAGE_URL = image ?? mediaConfig.skillImage;

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
            // Wrapper Motion untuk setiap sel grid
            <motion.div
              key={index}
              className="relative w-full h-full aspect-square md:aspect-auto"
              initial={{ opacity: 0, scale: 0.8 }} // Mulai agak kecil dan transparan
              whileInView={{ opacity: 1, scale: 1 }} // Membesar ke ukuran normal
              transition={{
                duration: 0.4,
                delay: index * 0.07, // Stagger effect cepat berdasarkan index
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }}
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
            </motion.div>
          );
        })}
      </div>

      {/* --- AREA KONTEN TEKS --- */}
      <div className="flex-1 relative flex flex-col justify-center items-start p-8 md:p-16 lg:p-16">
        {/* Heading Animation - Slide in from Left */}
        <motion.h2
          className="font-gotham font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl tracking-tighter"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          Skills
        </motion.h2>

        {/* Paragraph Container Animation - Fade Up */}
        <motion.div
          className="max-w-3xl min-h-[100px] flex items-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {/* Data rendered with content on the server */}
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, index) => (
                <SkillBadge
                  key={skill.id}
                  name={skill.name}
                  logoUrl={skill.logo}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="font-dm text-brand-yellow text-2xl md:text-3xl lg:text-4xl leading-relaxed text-left font-medium">
              “No skills added yet.”
            </p>
          )}
        </motion.div>

        {/* Dekorasi Matahari Kuning - Pop Up Animation */}
        <motion.div
          className="absolute top-0 right-0 select-none p-8 md:p-0"
          initial={{ scale: 0, rotate: 90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 60, duration: 1 }}
          viewport={{ once: false }}
        >
          <div className="transition-transform hover:rotate-45 duration-500">
            <Image
              src="/sun-yellow.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-12 h-12 md:w-28 md:h-28 lg:w-[140px] lg:h-[140px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
