import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export const BackButton = ({
  href = "/#projects",
  label = "Back to Projects",
}: BackButtonProps) => {
  return (
    <Link href={href} className="group flex items-center gap-2 w-fit">
      <ArrowLeft
        size={20}
        aria-hidden="true"
        className="text-brand-red transition-transform group-hover:-translate-x-1"
      />
      <span className="font-gotham font-bold text-brand-red text-sm md:text-base uppercase transition-all">
        {label}
      </span>
    </Link>
  );
};
