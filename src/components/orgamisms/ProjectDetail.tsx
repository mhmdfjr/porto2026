"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/supabase";
import { Tag } from "@/components/atoms/Tag";
import { BackButton } from "@/components/atoms/BackButton";
import { Button } from "../atoms/Button";

// --- VARIANTS ANIMASI SLIDER (Geser Gambar) ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// --- VARIANTS ANIMASI KONTEN (Gaya Footer: Staggered) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay antar elemen anak
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

interface ProjectDetailSectionProps {
  project: Project | null;
  loading: boolean;
}

export const ProjectDetailSection = ({
  project,
  loading,
}: ProjectDetailSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Logic Slider
  useEffect(() => {
    if (!project || !project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project]);

  const paginate = (newIndex: number) => {
    setDirection(newIndex > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(newIndex);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-black">
        <p className="font-dm text-brand-red animate-pulse text-xl">
          Loading project details...
        </p>
      </div>
    );
  }

  // Not Found State
  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-brand-black">
        <h1 className="font-gotham text-brand-red text-4xl">
          Project Not Found
        </h1>
        <BackButton />
      </div>
    );
  }

  // Safe Image Logic
  const rawImages = project.images || [];
  const validImages = rawImages.filter(
    (img) =>
      typeof img === "string" &&
      (img.startsWith("http") || img.startsWith("/")),
  );
  const images = validImages.length > 0 ? validImages : ["/sun-red.svg"];

  return (
    <section className="relative w-full bg-brand-black overflow-hidden selection:bg-brand-red selection:text-black">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-10">
        {/* --- HEADER ANIMATION (Slide In from Left) --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <BackButton />

          <div className="flex items-center gap-4 mb-4">
            <span className="font-dm text-brand-red/60 text-sm md:text-base uppercase tracking-widest">
              {new Date(project.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
              })}
            </span>
            <span className="font-dm text-brand-red/60 text-sm md:text-base uppercase tracking-widest">
              | Web Development
            </span>
          </div>

          <h1 className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 md:mb-10">
            {project.name}
          </h1>
        </motion.div>

        {/* --- IMAGE SLIDER ANIMATION (Pop Up / Scale Up) --- */}
        <motion.div
          className="relative w-full aspect-video md:aspect-21/9 bg-gray-900 border border-brand-red overflow-hidden mb-8 md:mb-10 group"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.8 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => paginate(idx)}
                  className={`h-1 md:h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentImageIndex
                      ? "w-8 md:w-12 bg-brand-red"
                      : "w-2 md:w-3 bg-brand-red/30 hover:bg-brand-red/60"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* --- DESCRIPTION & TECH STACK (Grid Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-10">
          <motion.div
            className="lg:col-span-8 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.h3
              className="font-gotham font-bold text-brand-red text-2xl md:text-3xl mb-2"
              variants={itemVariants}
            >
              Overview
            </motion.h3>

            <motion.p
              className="font-dm text-brand-red text-base md:text-lg lg:text-xl leading-relaxed whitespace-pre-line"
              variants={itemVariants}
            >
              {project.description}
            </motion.p>

            <motion.div className="flex gap-4 mt-6" variants={itemVariants}>
              <Button
                href={project.live_url ? project.live_url : "#"}
                text="Live Preview"
                target={project.live_url ? "_blank" : "_self"}
              />
              <Button
                href={project.code_url ? project.code_url : "#"}
                variant="secondary"
                text="View Code"
                target={project.code_url ? "_blank" : "_self"}
              />
            </motion.div>
          </motion.div>

          {/* Kolom Kanan: Sidebar (Staggered Animation) */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-brand-red lg:pl-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.div variants={itemVariants}>
              <h4 className="font-gotham font-bold text-brand-red text-lg md:text-xl mb-4 uppercase">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techstack &&
                  project.techstack.map((tech, idx) => (
                    <Tag key={idx} label={tech} />
                  ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-gotham font-bold text-brand-red text-lg md:text-xl mb-4 uppercase">
                Share
              </h4>
              <div className="flex gap-4 text-brand-red/60">
                <span className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold">
                  LinkedIn
                </span>
                <span className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold">
                  Twitter
                </span>
                <span className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold">
                  Copy Link
                </span>
              </div>
            </motion.div>

            <motion.div
              className="w-max"
              initial={{ scale: 0, rotate: 90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }} // Delay sedikit agar muncul terakhir
              viewport={{ once: false }}
            >
              <Image
                src="/sun-red.svg"
                alt="Decorative Sun"
                width={140}
                height={140}
                className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-20 h-20 md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
