"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_IMAGE =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/Me/me6.JPG";

export const FooterSection = () => {
  return (
    <footer
      id="footer"
      className="relative w-full bg-brand-red pt-4 pb-4 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        <div className="flex-1 flex flex-col gap-8 md:gap-10">
          {/* Heading Animation - Slide in from Right */}
          <motion.h2
            className="font-gotham w-full text-end font-black text-brand-yellow text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Thank you
          </motion.h2>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-12 md:gap-20">
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
              className="object-cover grayscale contrast-125 opacity-90"
            />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center gap-2 md:gap-4 md:pl-8">
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Email
              </span>
              <Link
                href="mailto:moh.fajar1304@gmail.com"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                moh.fajar1304@gmail.com
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Social media
              </span>
              <Link
                href="https://instagram.com/holy.jar_"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                @holy.jar_
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                Phone
              </span>
              <Link
                href="https://wa.me/6285700072350"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                +62 857-0007-2350
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
            >
              <span className="font-gotham font-bold text-brand-yellow text-xl md:text-2xl lg:text-3xl">
                LinkedIn
              </span>
              <Link
                href="https://www.linkedin.com/in/mohamadfajarnurkhasani/"
                target="_blank"
                className="font-dm text-brand-yellow text-base md:text-lg lg:text-xl hover:text-brand-yellow transition-colors"
              >
                Mohamad Fajar Nur Khasani
              </Link>
            </motion.div>
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
        className="max-w-7xl mx-auto mt-8 pt-4 border-t border-brand-yellow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: false }}
      >
        <p className="font-dm text-brand-yellow text-sm text-center md:text-left">
          © {new Date().getFullYear()} Mohamad Fajar. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};
