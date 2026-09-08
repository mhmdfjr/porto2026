"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { mediaConfig } from "@/lib/config";
import type { Contact } from "@/lib/supabase";

const FOOTER_IMAGE = mediaConfig.footerImage;

export const FooterSection = ({ contacts = [] }: { contacts?: Contact[] }) => {
  return (
    <footer
      id="footer"
      className="relative w-full bg-brand-black py-4 pb-4 px-6 md:px-12 overflow-hidden"
    >
      <div className="w-full mx-auto flex flex-col space-y-6">
        <motion.h2
          className="font-gotham w-full text-start font-black text-brand-yellow text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          Hit me up!
        </motion.h2>

        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6">
          <motion.div
            className="relative w-full md:max-w-1/2 aspect-video bg-brand-yellow/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <Image
              src={FOOTER_IMAGE}
              alt="Thank you visual"
              fill
              className="object-cover contrast-125 opacity-90"
            />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center gap-2 md:gap-4 md:pl-8">
            {contacts.map((contact, index) => {
              const isExternal = contact.url.startsWith("http");
              return (
                <motion.div
                  key={contact.id}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                    {contact.name}
                  </span>
                  <Link
                    href={contact.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors break-all"
                  >
                    {contact.username}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="transition-transform hover:rotate-45 duration-500 select-none"
            initial={{ scale: 0, rotate: 90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            viewport={{ once: false }}
          >
            <Image
              src="/sun-yellow.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-10 h-10 md:w-30 md:h-30 lg:w-32 lg:h-32"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-full mx-auto mt-8 pt-4 border-t border-brand-yellow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: false }}
      >
        <p className="font-dm text-brand-yellow text-sm text-center">
          © {new Date().getFullYear()} Mohamad Fajar. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};
