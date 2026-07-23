"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  className: string;
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <section
      id="gallery"
      className="relative bg-brand-yellow py-10 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          className="font-gotham w-full text-end font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-8 md:mb-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          Gallery
        </motion.h2>

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

        <div className="grid grid-cols-6 lg:grid-cols-12 auto-rows-[56px] md:auto-rows-[68px] lg:auto-rows-[90px] gap-2 md:gap-3 lg:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative group overflow-hidden bg-brand-red/10 ${item.className}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-colors duration-300 z-10" />

              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                loading="eager"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
