import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col gap-3 text-center justify-center items-center">
      {/* Judul Fitur: Gotham Bold, Kuning */}
      <h3 className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
        {title}
      </h3>
      {/* Deskripsi: DM Sans, Putih */}
      <p className="font-dm text-brand-yellow lg:text-xl md:text-lg text-base leading-relaxed opacity-90 max-w-md mx-auto md:mx-0">
        {description}
      </p>
    </div>
  );
};
