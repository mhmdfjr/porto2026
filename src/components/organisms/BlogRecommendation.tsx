"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/supabase";

interface BlogRecommendationsProps {
  recommendations: Post[];
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

export const BlogRecommendationSection = ({
  recommendations,
}: BlogRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <motion.div variants={cardVariants} className="space-y-4">
      <motion.h3
        className="font-gotham font-bold text-brand-yellow text-lg md:text-xl uppercase"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        Next Articles
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {recommendations.map((rec) => (
          <motion.div key={rec.id} variants={cardVariants}>
            <Link href={`/blog/${rec.slug}`} className="group block space-y-2">
              {rec.cover_image && (
                <div className="relative w-full aspect-video bg-brand-red/40 overflow-hidden mb-4 transition-all">
                  <Image
                    src={rec.cover_image}
                    alt={rec.title}
                    fill
                    className="object-cover contrast-125 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              )}

              <h4 className="font-gotham font-black text-brand-yellow text-xl tracking-tight decoration-brand-yellow underline-offset-4">
                {rec.title}
              </h4>
              <p className="font-dm text-brand-yellow/60 text-sm md:text-base line-clamp-2">
                {rec.excerpt}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
