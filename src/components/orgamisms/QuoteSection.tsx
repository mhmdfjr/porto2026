"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- DATA QUOTES ---
const quotesData = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "It always seems impossible until it is done.",
    author: "Nelson Mandela",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

// --- GAMBAR DEKORASI ---
const IMG_1 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/art1.jpg";
const IMG_2 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/building1.jpg";
const IMG_3 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/cafe1.jpg";

export const QuotesSection = () => {
  const [todaysQuote, setTodaysQuote] = useState(quotesData[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const quoteIndex = dayOfYear % quotesData.length;
    setTodaysQuote(quotesData[quoteIndex]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="quote"
      className="relative w-full bg-brand-yellow py-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <div className="flex-1 flex flex-col gap-8 md:gap-10 text-left z-10">
          {/* Judul Animasi */}
          <motion.h2
            className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Quote of The Day
          </motion.h2>

          <div className="max-w-xl">
            {/* Quote Text Animasi */}
            <motion.p
              className="font-dm font-medium text-brand-red text-2xl md:text-3xl lg:text-4xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              &ldquo;{todaysQuote.text}&rdquo;
            </motion.p>

            {/* Author Animasi */}
            <motion.p
              className="mt-4 md:mt-6 font-gotham font-bold text-brand-red text-2xl md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              - {todaysQuote.author}
            </motion.p>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE GRID 2x2 --- */}
        <div className="w-full md:w-1/2 h-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full h-full">
            {/* Slot 1: Matahari Merah (Pop Up Animation) */}
            <motion.div
              className="relative aspect-4/3 w-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: false }}
            >
              <div className="transition-transform hover:rotate-45 duration-500 select-none">
                <Image
                  src="/sun-red.svg"
                  alt="Decorative Sun"
                  width={100}
                  height={100}
                  className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-32 h-32 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px]"
                />
              </div>
            </motion.div>

            {/* Slot 2: Image Top Right (Delay 0.2s) */}
            <motion.div
              className="relative aspect-4/3 w-full bg-green-400 overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMG_1}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Slot 3: Image Bottom Left (Delay 0.3s) */}
            <motion.div
              className="relative aspect-4/3 w-full bg-orange-400 overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMG_2}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Slot 4: Image Bottom Right (Delay 0.4s) */}
            <motion.div
              className="relative aspect-4/3 w-full bg-yellow-400 overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMG_3}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
