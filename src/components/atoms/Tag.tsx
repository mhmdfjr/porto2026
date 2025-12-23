import React from "react";

interface TagProps {
  label: string;
}

export const Tag = ({ label }: TagProps) => {
  return (
    <span className="px-3 py-1 border border-brand-red text-brand-red font-dm text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-brand-red hover:text-black transition-colors cursor-default">
      #{label}
    </span>
  );
};
