import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  variant?: ButtonVariant;
  target?: string;
}

export const Button = ({
  children,
  text,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  // 1. Base Styles (Font, Padding, Transition)
  const baseStyles =
    "inline-flex items-center justify-center px-6 md:px-8 py-3 font-gotham font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 min-w-max cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  // 2. Variant Styles
  const variants = {
    primary:
      "bg-brand-red text-black border border-transparent hover:bg-red-600",
    secondary:
      "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-black",
  };

  // Gabungkan Class
  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  // Tentukan konten (Prioritas: text prop > children)
  const content = text || children;

  // 3. Render Logic: Jika ada href, render Link. Jika tidak, render Button.
  if (href) {
    return (
      <Link href={href} className={finalClassName} target={props.target}>
        {content}
      </Link>
    );
  }

  return (
    <button className={finalClassName} {...props}>
      {content}
    </button>
  );
};
