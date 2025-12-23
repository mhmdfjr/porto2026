"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/supabase";

interface ProjectRecommendationsProps {
  recommendations: Project[];
}

// --- VARIANTS ANIMASI (Meniru gaya Footer) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay antar kartu (mirip delay antar link kontak di footer)
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Muncul dari bawah
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const ProjectRecommendationSection = ({
  recommendations,
}: ProjectRecommendationsProps) => {
  // Jika tidak ada data, return null
  if (!recommendations || recommendations.length === 0) return null;

  const getSafeImage = (images: string[] | null | undefined) => {
    if (!images || !Array.isArray(images)) return "/sun-red.svg";
    const validImage = images.find(
      (img) =>
        typeof img === "string" &&
        (img.startsWith("http") || img.startsWith("/"))
    );
    return validImage || "/sun-red.svg";
  };

  return (
    <section className="bg-brand-yellow w-full px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="border-t pt-10 pb-16">
          {/* --- HEADER SECTION --- */}
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              className="font-gotham font-black text-brand-red text-3xl md:text-4xl lg:text-5xl tracking-tighter"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              Next Projects
            </motion.h2>

            <motion.div
              className="select-none"
              initial={{ scale: 0, rotate: 90 }} // Mulai kecil dan miring
              whileInView={{ scale: 1, rotate: 0 }} // Membesar normal
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src="/sun-red.svg"
                alt="sun"
                width={56}
                height={56}
                className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-16 h-16 md:w-[60px] md:h-[60px] lg:w-20 lg:h-20"
              />
            </motion.div>
          </div>

          {/* --- GRID CARDS (STAGGERED ANIMATION) --- */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Trigger saat 20% terlihat
          >
            {recommendations.map((rec) => {
              const safeImage = getSafeImage(rec.image);

              return (
                <motion.div key={rec.id} variants={cardVariants}>
                  <Link href={`/project/${rec.id}`} className="group block">
                    {/* Image Container with Scale Effect on Hover */}
                    <div className="relative w-full aspect-video bg-gray-900 overflow-hidden mb-4 transition-all">
                      <Image
                        src={safeImage}
                        alt={rec.name}
                        fill
                        className="object-cover contrast-125 group-hover:scale-105 transition-all duration-500"
                      />
                      {/* Overlay Hover */}
                      <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors" />
                    </div>

                    {/* Text Content */}
                    <h3 className="font-gotham font-black text-brand-red text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight decoration-brand-red underline-offset-4">
                      {rec.name}
                    </h3>
                    <p className="font-dm text-brand-red/60 text-sm md:text-base mt-2 line-clamp-2">
                      {rec.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
