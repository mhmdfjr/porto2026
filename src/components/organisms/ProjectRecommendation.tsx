"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/supabase";

interface ProjectRecommendationsProps {
  recommendations: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const ProjectRecommendationSection = ({
  recommendations,
}: ProjectRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getSafeImage = (images: string[] | null | undefined) => {
    if (!images || !Array.isArray(images)) return "/sun-yellow.svg";
    const validImage = images.find(
      (img) =>
        typeof img === "string" &&
        (img.startsWith("http") || img.startsWith("/")),
    );
    return validImage || "/sun-red.svg";
  };

  return (
    <motion.div variants={cardVariants} className="space-y-2">
      <motion.h3
        className="font-gotham font-bold text-brand-yellow text-lg md:text-xl uppercase"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        Next Projects
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {recommendations.map((rec) => {
          const safeImage = getSafeImage(rec.images);

          return (
            <motion.div key={rec.id} variants={cardVariants}>
              <Link
                href={`/project/${rec.slug}`}
                className="group block space-y-2"
              >
                <div className="relative w-full aspect-video bg-gray-900 overflow-hidden transition-all">
                  <Image
                    src={safeImage}
                    alt={rec.name}
                    fill
                    className="object-cover contrast-125 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <h4 className="font-gotham font-black text-brand-yellow text-xl tracking-tight decoration-brand-yellow underline-offset-4">
                  {rec.name}
                </h4>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
