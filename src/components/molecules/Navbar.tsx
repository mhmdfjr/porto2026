"use client";

import { useState, useEffect } from "react"; // Tambahkan useEffect
import { Menu, X } from "lucide-react";
import { Logo } from "../atoms/Logo";
import { NavLink } from "../atoms/NavLink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Project", href: "/project" },
  { label: "Blog", href: "/blog" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-brand-black shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <Logo />

      <div className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href} label={item.label} />
        ))}
      </div>

      <button
        className="md:hidden text-brand-red z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <div
        className={`fixed inset-0 bg-brand-black text-brand-red backdrop-blur-sm flex flex-col justify-center items-center gap-8 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navItems.map((item) => (
          <div key={item.label} onClick={() => setIsOpen(false)}>
            <NavLink href={item.href} label={item.label} />
          </div>
        ))}
      </div>
    </nav>
  );
};
