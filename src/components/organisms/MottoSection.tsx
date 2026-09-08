"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion

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
      className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <Image
          src={BANNER_IMAGE}
          alt="Street Background"
          fill
          className="object-cover grayscale brightness-75"
          priority
        />
      </motion.div>

      <div className="relative z-10 p-4 w-full flex justify-center">
        <motion.div
          className="flex gap-2 md:gap-4 justify-center items-center bg-brand-red p-4 md:px-12 md:py-8 shadow-2xl cursor-default"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <motion.div
            className="transition-transform hover:rotate-45 duration-500"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <Image
              src="/sun-black.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
            />
          </motion.div>

          <motion.h2
            className="min-w-max font-gotham font-black text-brand-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            {text}
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};
