"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop";
const IMG_2 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";
const IMG_3 =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop";

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
      className="relative w-full bg-brand-yellow py-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <div className="flex-1 flex flex-col gap-8 md:gap-10 text-left z-10">
          <h2 className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            Quote of The Day
          </h2>

          <div className="max-w-xl">
            <p className="font-dm font-medium text-brand-red text-2xl md:text-3xl lg:text-4xl leading-relaxed">
              &ldquo;{todaysQuote.text}&rdquo;
            </p>
            <p className="mt-4 md:mt-6 font-gotham font-bold text-brand-red text-2xl md:text-3xl lg:text-4xl">
              - {todaysQuote.author}
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE GRID 2x2 --- */}
        <div className="w-full md:w-1/2 h-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full h-full">
            {/* Slot 1: Matahari Merah (Sebelumnya Kosong) */}
            {/* Menggunakan 'flex' agar matahari berada di tengah cell */}
            <div className="relative aspect-4/3 w-full flex items-center justify-center">
              <div className="transition-transform hover:rotate-45 duration-500 select-none">
                <Image
                  src="/sun-red.svg" // Pastikan file ini ada di folder public/
                  alt="Decorative Sun"
                  width={100}
                  height={100}
                  className="object-contain w-32 h-32 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px]"
                />
              </div>
            </div>

            {/* Slot 2: Image Top Right */}
            <div className="relative aspect-4/3 w-full bg-green-400 overflow-hidden group">
              <Image
                src={IMG_1}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Slot 3: Image Bottom Left */}
            <div className="relative aspect-4/3 w-full bg-orange-400 overflow-hidden group">
              <Image
                src={IMG_2}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Slot 4: Image Bottom Right */}
            {/* Kembali ke 'col-span-1' dan 'aspect-[4/3]' agar konsisten di grid 2x2 */}
            <div className="relative aspect-4/3 w-full bg-yellow-400 overflow-hidden group">
              <Image
                src={IMG_3}
                alt="Decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
