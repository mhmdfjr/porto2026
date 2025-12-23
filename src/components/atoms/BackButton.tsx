import React from "react";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export const BackButton = ({
  href = "/#projects",
  label = "Back to Projects",
}: BackButtonProps) => {
  return (
    <Link href={href} className="group flex items-center gap-2 w-fit mb-8">
      <span className="text-brand-red text-xl transition-transform group-hover:-translate-x-2">
        ←
      </span>
      <span className="font-gotham font-bold text-brand-red text-sm md:text-base uppercase tracking-widest border-b border-transparent group-hover:border-brand-red transition-all">
        {label}
      </span>
    </Link>
  );
};
