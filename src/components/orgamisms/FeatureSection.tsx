import React from "react";
import Image from "next/image";
import { FeatureCard } from "../molecules/FeatureCard";

const featuresData = [
  {
    title: "Modern Tech Stack",
    description:
      "Building robust applications using the latest technologies like Next.js 15, React, and Supabase.",
  },
  {
    title: "Tailored Solutions",
    description:
      "I don't just write code; I craft digital solutions customized to solve your specific business challenges.",
  },
  {
    title: "Interactive UI",
    description:
      "Bringing static designs to life with smooth animations and responsive interactions.",
  },
  {
    title: "Reliable Partner",
    description:
      "Clear communication and timely delivery. I treat your project with the same passion as my own.",
  },
];

export const FeatureSection = () => {
  return (
    <section
      id="feature"
      className="relative bg-brand-red py-16 px-6 md:px-12 z-20 overflow-hidden"
    >
      {/* Dekorasi Ikon */}
      <div className="transition-transform hover:rotate-45 duration-500 absolute top-1 -translate-y-1/2 -left-10 md:-left-18 select-none">
        <Image
          src="/sun-yellow.svg"
          alt="Decorative Sun"
          width={100}
          height={100}
          className="animate-spin-slow object-contain w-28 h-28 md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* <div className="w-full flex justify-center md:justify-end"> */}
        <h2 className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl md:text-end leading-tight">
          What's the reason
        </h2>
        <h2 className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-10 md:text-end leading-tight">
          for choosing me?
        </h2>
        {/* </div> */}

        {/* PERBAIKAN GRID:
           1. items-start: Agar item tidak dipaksa memenuhi tinggi baris (stretch), sehingga efek turun terlihat jelas.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-x-24 items-start">
          {featuresData.map((feature, index) => {
            // Logika: Jika index ganjil (1, 3, dst..), berarti dia ada di kolom kanan (pada desktop).
            // Kita beri margin-top besar (md:mt-24) agar posisinya turun.
            const isRightColumn = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isRightColumn ? "mt-8 md:mt-10" : ""
                }`}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
