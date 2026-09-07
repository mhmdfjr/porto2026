"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDateRange } from "@/lib/database";
import type { Education } from "@/lib/supabase";

export const EducationSection = ({
  educations,
}: {
  educations: Education[];
}) => {

  return (
    <section
      id="education"
      className="relative w-full bg-brand-red py-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex gap-4 md:gap-6 justify-end items-start z-10 relative">
          <motion.div
            className="transition-transform hover:rotate-45 duration-500 select-none"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            viewport={{ once: false }}
          >
            <Image
              src="/sun-yellow.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slowobject-contain w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
            />
          </motion.div>

          <motion.h2
            className="font-gotham text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-20 tracking-tighter"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Education
          </motion.h2>
        </div>

        <div className="relative min-h-[400px]">
            <motion.div
              className="hidden md:block absolute top-0 left-0 w-full h-1 bg-brand-yellow rounded-full z-0 transform -translate-y-12 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                viewport={{ once: false, amount: 0.8 }}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-yellow border-4 border-brand-red rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-yellow border-4 border-brand-red rounded-full" />
              </motion.div>

              <motion.div
                className="md:hidden absolute top-0 left-2 h-full w-1 bg-brand-yellow/50 rounded-full z-0 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: false }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10">
                {educations.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative pl-10 md:pl-0 flex flex-col gap-4 group"
                  >
                    <motion.div
                      className="absolute
                      /* Mobile Position */
                      left-2.5 top-0 w-6 h-6 -translate-x-1/2
                      /* Desktop Position */
                      md:left-1/2 md:-top-12 md:translate-x-1/2 md:-translate-y-1/2
                      bg-brand-yellow rounded-full border-4 border-brand-red z-10 transition-transform duration-300 group-hover:scale-125"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: 0.5 + index * 0.2,
                      }}
                      viewport={{ once: false }}
                    />

                    <motion.div
                      className="relative w-full aspect-video bg-gray-900 overflow-hidden shadow-2xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6 + index * 0.2,
                        ease: "easeOut",
                      }}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>

                    <motion.div
                      className="flex flex-col gap-2 text-left md:text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + index * 0.2,
                        ease: "easeOut",
                      }}
                      viewport={{ once: false, amount: 0.8 }}
                    >
                      <h3 className="font-gotham font-black text-brand-yellow text-xl md:text-2xl lg:text-3xl tracking-tight">
                        {item.name}
                      </h3>

                      <span className="font-dm font-bold text-white/90 text-sm md:text-base lg:text-lg uppercase tracking-widest">
                        {item.major} • {formatDateRange(item.start, item.end)}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
        </div>
      </div>
    </section>
  );
};
