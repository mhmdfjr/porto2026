"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPinned, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { mediaConfig } from "@/lib/config";
import type { About } from "@/lib/supabase";

const IMAGE_PROFILE_1 = mediaConfig.profileBack;
const IMAGE_PROFILE_2 = mediaConfig.profileFront;

const CV_URL = mediaConfig.cvUrl;

const fallbackAbout: About = {
  id: 0,
  name: "Mohamad Fajar Nur Khasani",
  role: "Full-Stack Developer",
  age: "-",
  address: "-",
  description:
    "Passionate Full-Stack Developer dengan pengalaman akademis, profesional, dan komunitas di bidang teknologi.",
  created_at: "",
};

export const AboutHero = ({ about }: { about: About | null }) => {
  const profile = about ?? fallbackAbout;
  return (
    <section
      id="about"
      className="relative w-full bg-brand-black text-brand-red pt-12 lg:pb-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-6 items-center">
          <motion.div
            className="flex flex-col gap-4 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-gotham font-bold text-brand-red text-lg md:text-xl tracking-wide uppercase">
                {profile.role}
              </p>
              <h2 className="font-gotham font-black text-3xl md:text-4xl lg:text-5xl tracking-tight">
                {profile.name}
              </h2>
            </div>

            <dl className="flex flex-wrap gap-x-6 font-dm text-base md:text-lg">
              <div className="flex items-center gap-2">
                <dt aria-label="Age">
                  <Sparkles className="h-5 w-5 text-brand-red/70" aria-hidden />
                </dt>
                <dd className="font-semibold  text-brand-red/70">
                  {String(profile.age)} y.o
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt aria-label="Address">
                  <MapPinned
                    className="h-5 w-5 text-brand-red/70"
                    aria-hidden
                  />
                </dt>
                <dd className="font-semibold text-brand-red/70">
                  {profile.address}
                </dd>
              </div>
            </dl>

            <motion.p
              className="font-dm lg:text-xl md:text-lg text-base leading-relaxed font-medium text-justify md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false }}
            >
              {profile.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Button
                href="#education"
                text="What's more?"
                variant="solid-red-black"
                icon="university"
              />
              <Button
                href={CV_URL}
                variant="outline-red-black"
                target="_blank"
                icon="arrow-big-down-dash"
                rel="noopener noreferrer"
                text="Download my CV"
              />
            </motion.div>
          </motion.div>

          <div className="relative h-[500px] lg:h-[600px] w-full flex flex-col justify-start md:gap-0 lg:block">
            <motion.div
              className="absolute top-1/2 md:top-1/8 left-1/10 select-none z-20"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="transition-transform hover:rotate-45 duration-500">
                <Image
                  src="/sun-red.svg"
                  alt="Decorative Sun"
                  width={100}
                  height={100}
                  className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative w-[80%] md:w-[60%] h-60 md:h-[270px] lg:h-[300px] lg:absolute lg:top-0 lg:right-0 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_1}
                alt="Profile Back"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>

            <motion.div
              className="relative -top-10 md:-top-16 self-end w-[80%] md:w-[70%] h-60 md:h-[300px] lg:h-[350px] lg:mt-0 lg:absolute lg:bottom-0 lg:left-10 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_2}
                alt="Profile Front"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
