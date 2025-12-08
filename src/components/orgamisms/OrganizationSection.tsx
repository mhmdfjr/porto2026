"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
      className="relative w-full bg-brand-yellow py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="w-full flex gap-4 md:gap-6 justify-start items-start">
          <h2 className="font-gotham text-start font-black text-brand-red text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-20 tracking-tighter">
            Organization
          </h2>
          <div className="transition-transform hover:rotate-45 duration-500 select-none">
            <Image
              src="/sun-red.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
            />
          </div>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="relative min-h-[400px]">
          {loading ? (
            // Loading State
            <div className="w-full flex justify-center items-center h-64">
              <p className="font-dm text-brand-red text-xl animate-pulse">
                Loading organizations...
              </p>
            </div>
          ) : (
            <>
              {/* 1. GARIS DEKORASI (Timeline Line) */}

              {/* Desktop: Horizontal Line (Di atas kartu) */}
              <div className="hidden md:block absolute top-0 left-0 w-full h-1 bg-brand-red rounded-full z-0 transform -translate-y-12">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-red rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-red rounded-full" />
              </div>

              {/* Mobile: Vertical Line (Di KANAN layar - Sesuai style Anda) */}
              <div className="md:hidden absolute top-0 right-2 h-full w-1 bg-brand-red rounded-full z-0" />

              {/* 2. ITEM GRID --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10">
                {organizations.map((item) => (
                  <div
                    key={item.id}
                    className="relative pr-10 md:pr-0 flex flex-col gap-6 group"
                  >
                    {/* --- DOT INDICATOR --- */}
                    <div
                      className="absolute
                      /* Mobile: KANAN menempel garis vertikal */
                      -right-3.5 top-0 w-6 h-6 -translate-x-1/2
                      /* Desktop: TENGAH atas menempel garis horizontal */
                      md:left-1/2 md:-top-12 md:translate-x-1/2 md:-translate-y-1/2
                      bg-brand-red rounded-full border-4 border-brand-yellow z-10 transition-transform duration-300 group-hover:scale-125"
                    />

                    {/* --- IMAGE CARD --- */}
                    <div className="relative w-full aspect-video bg-brand-red/10 overflow-hidden shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* --- CONTENT --- */}
                    <div className="flex flex-col gap-1 text-left">
                      {/* Nama Organisasi */}
                      <h3 className="font-gotham font-black text-brand-red text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight">
                        {item.name}
                      </h3>

                      {/* Role (Array joined) */}
                      <p className="font-gotham font-bold text-brand-red/90 text-sm md:text-base uppercase tracking-wide mt-1">
                        {item.role && item.role.length > 0
                          ? item.role.join(" & ")
                          : "Member"}
                      </p>

                      {/* Year & Location */}
                      <p className="font-dm text-brand-red/80 text-sm md:text-base leading-relaxed">
                        {item.year && item.year.length > 0
                          ? item.year.join(" - ")
                          : "Present"}{" "}
                        | {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
