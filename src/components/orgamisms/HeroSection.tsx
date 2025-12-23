"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion
import { Navbar } from "../molecules/Navbar";
import { Button } from "../atoms/Button";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      {/* --- Top Section --- */}
      <div className="relative h-[60vh] md:h-[65vh] w-full bg-gray-200 flex flex-col justify-end">
        {/* Navbar */}
        <Navbar />

        {/* Background Image Animation */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <Image
            src={HERO_IMAGE_URL}
            alt="Mountain Landscape"
            fill
            priority
            className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
          />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 pb-0">
          <motion.h1
            className="font-gotham font-black text-brand-red leading-[0.9] tracking-tighter
              text-[18vw]
              md:text-[9rem]
              lg:text-[12rem]
            "
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: "10%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Mohamad
          </motion.h1>
        </div>
      </div>

      <div className="flex-1 bg-brand-black w-full relative z-20 px-6 md:px-12 md:pt-0">
        <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row items-start md:items-center justify-between pb-12 gap-10">
          {/* Nama Belakang (Fajar) Animation - Staggered */}
          <motion.h1
            className="font-gotham font-black text-brand-red leading-[1.1] tracking-tighter
              text-[18vw]
              md:text-[9rem]
              lg:text-[12rem]
            "
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Fajar
          </motion.h1>

          {/* Subtitle & CTA Animation - Slide in from Right */}
          <motion.div
            className="w-full flex flex-col md:flex-row items-end justify-end md:gap-8"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <span className="mt-2 font-gotham font-bold text-brand-red lg:text-xl md:text-lg text-base">
              Web Developer
            </span>

            <div className="flex justify-end mt-8 lg:text-xl md:text-lg text-base">
              <Button href="#about" text="Learn More" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
