"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getOrganizations } from "@/lib/database";
import type { Organization } from "@/lib/supabase";

export const OrganizationSection = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const organizationsData = await getOrganizations();
        setOrganizations(organizationsData);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrganizations();
  }, []);

  return (
    <section
      id="organization"
      className="relative w-full bg-brand-yellow py-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex gap-4 md:gap-6 justify-start items-start z-10 relative">
          <motion.h2
            className="font-gotham text-start font-black text-brand-red text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-20 tracking-tighter"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Organization
          </motion.h2>

          <motion.div
            className="transition-transform hover:rotate-45 duration-500 select-none"
            initial={{ scale: 0, rotate: 90 }}
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
              src="/sun-red.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
            />
          </motion.div>
        </div>

        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="w-full flex justify-center items-center h-64">
              <p className="font-dm text-brand-red text-xl animate-pulse">
                Loading organizations...
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="hidden md:block absolute top-0 left-0 w-full h-1 bg-brand-red rounded-full z-0 transform -translate-y-12 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                viewport={{ once: false }}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-red rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-red rounded-full" />
              </motion.div>

              <motion.div
                className="md:hidden absolute top-0 right-2 h-full w-1 bg-brand-red rounded-full z-0 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: false }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10">
                {organizations.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative pr-10 md:pr-0 flex flex-col gap-6 group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <motion.div
                      className="absolute
                      /* Mobile: KANAN menempel garis vertikal */
                      -right-3.5 top-0 w-6 h-6 -translate-x-1/2
                      /* Desktop: TENGAH atas menempel garis horizontal */
                      md:left-1/2 md:-top-12 md:translate-x-1/2 md:-translate-y-1/2
                      bg-brand-red rounded-full border-4 border-brand-yellow z-10 transition-transform duration-300 group-hover:scale-125"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: 0.5 + index * 0.2,
                      }}
                      viewport={{ once: false }}
                    />

                    <div className="relative w-full aspect-video bg-brand-red/10 overflow-hidden shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <h3 className="font-gotham font-black text-brand-red text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight">
                        {item.name}
                      </h3>

                      <p className="font-gotham font-bold text-brand-red/90 text-sm md:text-base uppercase tracking-wide mt-1">
                        {item.role && item.role.length > 0
                          ? item.role.join(" & ")
                          : "Member"}
                      </p>

                      <p className="font-dm text-brand-red/80 text-sm md:text-base leading-relaxed">
                        {item.year && item.year.length > 0
                          ? item.year.join(" - ")
                          : "Present"}{" "}
                        | {item.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
