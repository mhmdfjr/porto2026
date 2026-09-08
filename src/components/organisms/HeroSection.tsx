"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../molecules/Navbar";
import { Button } from "../atoms/Button";
import { mediaConfig } from "@/lib/config";
import { getContactIcon } from "@/lib/contact-icons";
import type { Contact } from "@/lib/supabase";

const HERO_ROTATE_MS = 6000;

export const HeroSection = ({
  images = [],
  contacts,
}: {
  images?: string[];
  contacts: Contact[];
}) => {
  const slides = images.length > 0 ? images : [mediaConfig.heroImage];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, HERO_ROTATE_MS);
    return () => clearInterval(id);
  }, [slides.length]);
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden px-0"
    >
      {/* --- Top Section --- */}
      <div className="relative h-[60vh] md:h-[65vh] w-full bg-gray-200 flex flex-col justify-end">
        {/* Navbar */}
        <Navbar />

        {/* Background Slideshow — smooth crossfade every few seconds */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            >
              <Image
                src={slides[index % slides.length]}
                alt="Mountain Landscape"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover grayscale contrast-125"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 pb-12">
          <motion.h1
            className="font-gotham font-black text-brand-red leading-[0.9] tracking-tighter max-w-min
              text-[18vw]
              md:text-[9rem]
              lg:text-[12rem]
            "
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: "10%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Mohamad Fajar
          </motion.h1>
        </div>
      </div>

      <div className="w-full flex flex-col bg-brand-black relative z-20 pt-12 px-6 md:px-12">
        <div className="w-full mx-auto h-full mb-6 flex flex-col items-start justify-end gap-10">
          <motion.div
            className="w-full flex flex-col items-end justify-end gap-4"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <p className="font-gotham font-bold text-brand-red md:text-2xl lg:text-3xl text-xl">
              Full-Stack Developer
            </p>

            <div className="flex justify-end md:text-lg lg:text-xl text-base">
              <Button href="#about" text="Get to know more" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full mx-auto flex items-start justify-end gap-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {contacts.map(({ id, name, url, icon }) => {
            const Icon = getContactIcon(icon);
            return (
              <Link
                key={id}
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={name}
                className="text-brand-red hover:text-brand-yellow transition-colors duration-300"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
