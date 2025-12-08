"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WorkCard } from "../molecules/WorkCard";
import { getWorks, formatDateRange } from "@/lib/database";
import type { Work } from "@/lib/supabase";

export const WorkSection = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const worksData = await getWorks();
        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorks();
  }, []);

  return (
    <section
      id="work"
      className="relative bg-brand-black py-16 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Dekorasi Matahari Berputar */}
        <div className="transition-transform hover:rotate-45 duration-500 absolute bottom-10 right-10 md:right-16 select-none z-0 opacity-50">
          <Image
            src="/sun-red.svg"
            alt="Decorative Sun"
            width={140}
            height={140}
            className="animate-spin-slow object-contain w-20 h-20 md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px]"
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 md:mb-16 relative z-10">
          <h2 className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            Work
          </h2>
        </div>

        {/* --- Content Area --- */}
        {loading ? (
          // Loading State
          <div className="w-full flex justify-center items-center h-64">
            <p className="font-dm text-brand-red text-xl animate-pulse">
              Loading experience...
            </p>
          </div>
        ) : (
          // Grid Layout 3-2-1
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 row-gap-12 relative z-10">
            {works.length > 0 ? (
              works.map((work, index) => (
                <WorkCard
                  key={work.id}
                  index={index}
                  company={work.company}
                  role={work.role}
                  location={work.location}
                  // Helper function untuk format tanggal "Jan 2020 - Present"
                  dateRange={formatDateRange(work.start, work.end)}
                  imageUrl={work.image}
                />
              ))
            ) : (
              <p className="font-dm text-brand-red/60 text-lg">
                No work experience data found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
