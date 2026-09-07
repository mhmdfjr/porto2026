import React from "react";

type BadgeVariant = "primary" | "secondary";

interface BadgeProps {
  text?: string;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({
  text,
  variant = "primary",
  className = "",
  ...props
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 md:px-8 pt-3 pb-2 font-gotham font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 min-w-max cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-red text-black border border-transparent hover:bg-red-600",
    secondary:
      "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-black",
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <div className={finalClassName} {...props}>
      {text}
    </div>
  );
};
