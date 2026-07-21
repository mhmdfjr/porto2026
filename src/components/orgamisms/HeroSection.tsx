"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../molecules/Navbar";
import { Button } from "../atoms/Button";
import { Mail, Instagram, Phone, Linkedin, Github } from "lucide-react";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop";

const CONTACT_LINKS = [
  { name: "Email", href: "mailto:youremail@example.com", icon: Mail },
  {
    name: "Instagram",
    href: "https://instagram.com/yourusername",
    icon: Instagram,
  },
  { name: "Phone", href: "tel:+6281234567890", icon: Phone },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  { name: "GitHub", href: "https://github.com/yourusername", icon: Github },
];

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
        <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
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

          <motion.div
            className="w-full flex flex-col md:flex-row items-end justify-end md:gap-8"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <span className="mt-2 font-gotham font-bold text-brand-red lg:text-xl md:text-lg text-base">
              Full-Stack Developer
            </span>

            <div className="flex justify-end mt-8 lg:text-xl md:text-lg text-base">
              <Button href="#about" text="Learn More" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full max-w-7xl mx-auto flex items-start justify-end gap-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {CONTACT_LINKS.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={name}
              className="text-brand-red hover:text-brand-yellow transition-colors duration-300"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
