import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`min-w-max px-8 py-3 bg-brand-red text-black font-gotham font-bold text-base md:text-lg lg:text-xl hover:bg-red-600 transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
