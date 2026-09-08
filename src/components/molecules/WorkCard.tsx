import React from "react";
import Image from "next/image";

interface WorkCardProps {
  company: string;
  role: string;
  location: string;
  dateRange: string;
  imageUrl: string;
  index: number;
}

export const WorkCard = ({
  company,
  role,
  location,
  dateRange,
  imageUrl,
  index,
}: WorkCardProps) => {
  const isReversedMd = Math.floor(index / 2) % 2 !== 0;
  const isReversedLg = Math.floor(index / 3) % 2 !== 0;

  return (
    <div
      className={`
        group w-full flex gap-4 items-center

        /* 1. Mobile (Default): Stack Vertikal */
        flex-col

        /* 2. Tablet (Medium): Logika 2 kolom */
        ${isReversedMd ? "md:flex-row-reverse" : "md:flex-row"}

        /* 3. Desktop (Large): Logika 3 kolom */
        ${isReversedLg ? "lg:flex-row-reverse" : "lg:flex-row"}
      `}
    >
      {/* --- Image Container --- */}
      <div className="relative w-full md:w-1/2 aspect-video md:aspect-square bg-brand-yellow overflow-hidden shadow-lg shrink-0">
        <div className="w-full h-full relative contrast-125 transition-transform duration-500 group-hover:scale-105">
          <Image
            src={imageUrl}
            alt={company}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      {/* --- Text Content --- */}
      <div className={`flex flex-col gap-1 w-full md:w-1/2`}>
        {/* Company Name */}
        <h3 className="font-gotham font-black text-brand-yellow text-base md:text-lg lg:text-xl uppercase tracking-tight">
          {company}
        </h3>

        {/* Role */}
        <p className="font-gotham font-bold text-brand-yellow/90 text-sm md:text-base lg:text-lg">
          {role}
        </p>

        {/* Date & Location */}
        <p className="font-dm text-brand-yellow/70 text-xs md:text-sm uppercase tracking-wider mt-1">
          {dateRange} <br /> {location}
        </p>
      </div>
    </div>
  );
};
