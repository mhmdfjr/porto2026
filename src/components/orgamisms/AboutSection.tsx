"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Ganti URL ini dengan path gambar lokal Anda nanti
const IMAGE_PROFILE_1 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/profil.png";
const IMAGE_PROFILE_2 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/nature7.jpg";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-brand-yellow text-brand-red pt-10 lg:pb-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Grid Layout: Mobile 1 Kolom, Desktop 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="flex flex-col gap-8 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Heading */}
            <h2 className="font-gotham font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
              About Me
            </h2>

            {/* Paragraph */}
            <motion.p
              className="font-dm lg:text-xl md:text-lg text-base leading-relaxed font-medium text-justify md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false }}
            >
              My name is Mohamad Fajar Nur Khasani and I am a passionate
              Full-Stack Web Developer. I am currently pursuing a degree in
              computer science at university, after previously studying computer
              network engineering in high school. I have gained valuable
              experience through work, training, education, and organizational
              activities related to technology, especially programming. My early
              interest in technology has grown into a strong dedication to the
              field, and I am always excited to collaborate, learn, and create
              impactful digital solutions.
            </motion.p>
          </motion.div>

          {/* --- KOLOM KANAN: Image Composition --- */}
          <div className="relative h-[500px] lg:h-[600px] w-full flex flex-col justify-start md:gap-0 lg:block">
            {/* Dekorasi Matahari - Pop Up Animation */}
            <motion.div
              className="absolute top-1/2 md:top-1/8 left-1/10 md:-left-1/10 select-none z-20"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="transition-transform hover:rotate-45 duration-500">
                <Image
                  src="/sun-red.svg"
                  alt="Decorative Sun"
                  width={100}
                  height={100}
                  className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-20 h-20 md:w-24 md:h-24 lg:w-30 lg:h-30"
                />
              </div>
            </motion.div>

            {/* Gambar 1 (Atas Kanan) - Slide in from Right */}
            <motion.div
              className="relative w-[90%] md:w-[70%] h-60 lg:h-[350px] lg:absolute lg:top-0 lg:right-0 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_1}
                alt="Profile Silhouette"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>

            {/* Gambar 2 (Bawah Kiri) - Slide in from Left/Bottom */}
            <motion.div
              className="relative -top-10 md:-top-16 self-end w-[80%] md:w-[60%] h-60 lg:h-[300px] lg:mt-0 lg:absolute lg:bottom-0 lg:left-10 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_2}
                alt="Nature View"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
