import React from "react";
import Link from "next/link";
import { getLucideIcon } from "@/lib/contact-icons";

export type ButtonVariant =
  | "solid-red-black"
  | "solid-red-yellow"
  | "outline-red-black"
  | "outline-red-yellow"
  | "solid-black-red"
  | "solid-black-yellow"
  | "outline-black-red"
  | "outline-black-yellow"
  | "solid-yellow-red"
  | "solid-yellow-black"
  | "outline-yellow-black"
  | "outline-yellow-red"
  /** Legacy aliases */
  | "primary"
  | "secondary";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  "solid-red-black":
    "bg-brand-red text-black border border-transparent hover:bg-red-600",
  "solid-red-yellow":
    "bg-brand-red text-brand-yellow border border-transparent hover:bg-red-600",
  "outline-red-black":
    "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-black",
  "outline-red-yellow":
    "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-yellow",
  "solid-black-red":
    "bg-black text-brand-red border border-transparent hover:bg-neutral-900",
  "solid-black-yellow":
    "bg-black text-brand-yellow border border-transparent hover:bg-neutral-900",
  "outline-black-red":
    "bg-transparent border border-black text-black hover:bg-black hover:text-brand-red",
  "outline-black-yellow":
    "bg-transparent border border-black text-black hover:bg-black hover:text-brand-yellow",
  "solid-yellow-red":
    "bg-brand-yellow text-brand-red border border-transparent hover:bg-yellow-500",
  "solid-yellow-black":
    "bg-brand-yellow text-black border border-transparent hover:bg-yellow-500",
  "outline-yellow-black":
    "bg-transparent border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black",
  "outline-yellow-red":
    "bg-transparent border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-red",
  primary:
    "bg-brand-red text-brand-black border border-transparent hover:bg-red-600",
  secondary:
    "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-black",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 pt-1.5 pb-1 text-xs md:text-sm",
  md: "px-6 md:px-8 pt-3 pb-2 text-sm md:text-base",
  lg: "px-8 md:px-10 pt-3.5 pb-3 md:py-4 text-base md:text-lg",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4 md:h-5 md:w-5",
  lg: "h-5 w-5 md:h-6 md:w-6",
};

export const Button = ({
  children,
  text,
  href,
  variant = "solid-red-black",
  size = "md",
  icon,
  className = "",
  target,
  rel,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-gotham font-bold uppercase tracking-wider transition-all duration-300 min-w-max cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const iconType = icon ? getLucideIcon(icon) : null;
  const content = (
    <>
      {iconType &&
        React.createElement(iconType, {
          className: iconSizes[size],
          "aria-hidden": true,
        })}
      {text || children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={finalClassName} target={target} rel={rel}>
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
