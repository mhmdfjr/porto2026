import React from "react";

export type TagVariant = "red" | "yellow";

interface TagProps {
  label: string;
  variant?: TagVariant;
}

const variantStyles: Record<TagVariant, string> = {
  red: "border-brand-red text-brand-red hover:bg-brand-red hover:text-black",
  yellow:
    "border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black",
};

export const Tag = ({ label, variant = "red" }: TagProps) => {
  return (
    <span
      className={`px-3 py-1 border font-dm text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-default ${variantStyles[variant]}`}
    >
      #{label}
    </span>
  );
};
