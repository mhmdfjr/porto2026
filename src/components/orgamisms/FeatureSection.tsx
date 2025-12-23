"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FeatureCard } from "../molecules/FeatureCard";

const featuresData = [
  {
    title: "Modern Tech Stack",
    description:
      "Building robust applications using the latest technologies like Next.js 15, React, and Supabase.",
  },
  {
    title: "Tailored Solutions",
    description:
      "I don't just write code; I craft digital solutions customized to solve your specific business challenges.",
  },
  {
    title: "Interactive UI",
    description:
      "Bringing static designs to life with smooth animations and responsive interactions.",
  },
  {
    title: "Reliable Partner",
    description:
      "Clear communication and timely delivery. I treat your project with the same passion as my own.",
  },
];

export const FeatureSection = () => {
  return (
    <section
      id="feature"
      className="relative bg-brand-red py-10 px-6 md:px-12 z-20 overflow-hidden"
    >
      {/* Dekorasi Ikon Matahari */}
      <motion.div
        className="absolute top-1 -translate-y-1/2 -left-10 md:-left-18 select-none z-0"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 20, duration: 1 }}
        viewport={{ once: false }}
      >
        <div className="transition-transform hover:rotate-45 duration-500">
          <Image
            src="/sun-yellow.svg"
            alt="Decorative Sun"
            width={100}
            height={100}
            className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-28 h-28 md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px]"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADING ANIMATION (Slide in from Right) */}
        <div className="flex flex-col items-end">
          <motion.h2
            className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl md:text-end leading-tight"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            What's the reason
          </motion.h2>

          <motion.h2
            className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-10 md:text-end leading-tight"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} // Sedikit delay biar berurutan
            viewport={{ once: false }}
          >
            for choosing me?
          </motion.h2>
        </div>

        {/* GRID ANIMATION (Staggered Fade Up) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 lg:gap-x-24 items-start">
          {featuresData.map((feature, index) => {
            // Logika layout zig-zag vertikal
            const isRightColumn = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                className={`transition-all duration-500 ${
                  isRightColumn ? "mt-2 md:mt-10" : ""
                }`}
                // Animasi per item
                initial={{ opacity: 0, y: 60 }} // Mulai dari bawah
                whileInView={{ opacity: 1, y: 0 }} // Naik ke posisi asli
                viewport={{ once: false, amount: 0.2 }} // Trigger saat 20% terlihat
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.15, // Delay bertingkat berdasarkan index (0.15s, 0.3s, dst)
                }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
