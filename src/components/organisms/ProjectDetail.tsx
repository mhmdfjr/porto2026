"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/supabase";
import { Tag } from "@/components/atoms/Tag";
import { BackButton } from "@/components/atoms/BackButton";
import { Button } from "../atoms/Button";
import { ProjectRecommendationSection } from "@/components/organisms/ProjectRecommendation";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
  project: Project;
  recommendations?: Project[];
}

export const ProjectDetailSection = ({
  project,
  recommendations = [],
}: ProjectDetailSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  const rawImages = project.images || [];
  const validImages = rawImages.filter(
    (img) =>
      typeof img === "string" &&
      (img.startsWith("http") || img.startsWith("/")),
  );
  const images = validImages.length > 0 ? validImages : ["/sun-red.svg"];

  return (
    <section className="relative w-full bg-brand-black overflow-hidden selection:bg-brand-red selection:text-black">
      <div className="relative z-10 mx-auto px-6 md:px-12 pt-24 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false }}
          className="space-y-2"
        >
          <BackButton />
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-6 lg:gap-10"
          id="side-content"
        >
          <motion.div
            className="lg:col-span-4 flex flex-col py-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div className="flex flex-col gap-1">
              <h1 className="font-gotham font-black text-brand-red text-2xl md:text-3xl lg:text-4xl leading-tight">
                {project.name}
              </h1>
              <p className="font-dm text-brand-red/80 text-sm md:text-base">
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <motion.div
              className="relative w-full aspect-video md:aspect-21/9 bg-brand-red/40 overflow-hidden group"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
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
                    x: { type: "spring", stiffness: 100, damping: 30 },
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

            <motion.h3
              className="font-gotham font-bold text-brand-red text-2xl md:text-3xl"
              variants={itemVariants}
            >
              Overview
            </motion.h3>

            <motion.p
              className="font-dm text-brand-red text-sm md:text-base leading-relaxed whitespace-pre-line"
              variants={itemVariants}
            >
              {project.description}
            </motion.p>

            <motion.div className="flex gap-4" variants={itemVariants}>
              <Button
                href={project.live_url ? project.live_url : "#"}
                text="Live Preview"
                size="sm"
                target={project.live_url ? "_blank" : "_self"}
              />
              <Button
                href={project.code_url ? project.code_url : "#"}
                variant="secondary"
                size="sm"
                text="View Code"
                target={project.code_url ? "_blank" : "_self"}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 flex flex-col py-6 space-y-6 lg:border-l lg:pl-10 lg:border-brand-red"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h4 className="font-gotham font-bold text-brand-red text-lg md:text-xl uppercase">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techstack &&
                  project.techstack.map((tech, idx) => (
                    <Tag key={idx} label={tech} />
                  ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h4 className="font-gotham font-bold text-brand-red text-lg md:text-xl uppercase">
                Share
              </h4>
              <div className="flex gap-4 text-brand-red/60">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://mhmdfjr.vercel.app/project/${project.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://mhmdfjr.vercel.app/project/${project.slug}`,
                  )}&text=${encodeURIComponent(project.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold"
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${project.name} https://mhmdfjr.vercel.app/project/${project.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-red transition-colors font-dm font-bold"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <ProjectRecommendationSection recommendations={recommendations} />

            <motion.div
              className="w-max"
              variants={itemVariants}
              initial={{ scale: 0, rotate: 90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <Image
                src="/sun-red.svg"
                alt="Decorative Sun"
                width={140}
                height={140}
                className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
