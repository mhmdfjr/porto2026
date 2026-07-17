"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion

// Tipe data untuk item galeri
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  // Class untuk mengatur ukuran grid (Bento Layout)
  className: string;
}

// Data Dummy dengan konfigurasi Grid agar mirip referensi
const galleryItems: GalleryItem[] = [
  // --- BARIS 1 ---
  {
    id: 1,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/nature10.jpg",
    alt: "Nature",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 2,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/art4.jpg",
    alt: "Me",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/nature15.JPG",
    alt: "Cafe",
    className: "md:col-span-2 md:row-span-1",
  },
  // --- BIG ITEM (KANAN) ---
  {
    id: 4,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/nature14.JPG", // Orang Duduk Background Merah
    alt: "Nature",
    className: "md:col-span-2 md:row-span-2",
  },
  // --- BARIS 2 & 3 (Campuran) ---
  {
    id: 5,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/building2.jpg", // Sepatu Hijau
    alt: "Me",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 6,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/book1.jpg",
    alt: "Book",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    src: "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/city1.jpg",
    alt: "City",
    className: "md:col-span-1 md:row-span-1",
  },
];

export const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative bg-brand-yellow py-10 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- Header Animation --- */}
        <motion.h2
          className="font-gotham w-full text-end font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-8 md:mb-10"
          initial={{ opacity: 0, x: 50 }} // Slide dari kanan
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          Gallery
        </motion.h2>

        {/* --- Sun Decoration Animation --- */}
        <motion.div
          className="absolute top-10 left-8 md:left-16 select-none z-10"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: false }}
        >
          <div className="transition-transform hover:rotate-45 duration-500">
            <Image
              src="/sun-red.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-18 h-18 md:w-20 md:h-20 lg:w-25 lg:h-25"
            />
          </div>
        </motion.div>

        {/* --- BENTO GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative group overflow-hidden bg-brand-red/10 ${item.className}`}
              // Animasi Per Item Grid
              initial={{ opacity: 0, scale: 0.9, y: 20 }} // Mulai sedikit kecil dan transparan
              whileInView={{ opacity: 1, scale: 1, y: 0 }} // Membesar ke ukuran normal
              transition={{
                duration: 0.5,
                delay: index * 0.1, // Stagger effect agar muncul berurutan
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.2 }} // Trigger saat 20% item terlihat
            >
              {/* Overlay Hover Effect */}
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-colors duration-300 z-10" />

              {/* Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
