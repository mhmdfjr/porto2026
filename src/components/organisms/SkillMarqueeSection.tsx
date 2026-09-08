"use client";
import { SkillBadge } from "../molecules/SkillBadge";
import type { Skill } from "@/lib/supabase";
import { motion } from "framer-motion";
import Image from "next/image";

const rowAnimations = [
  "animate-marquee",
  "animate-marquee-reverse",
  "animate-marquee-slow",
] as const;

function splitRows(skills: Skill[]): Skill[][] {
  const rows: Skill[][] = [[], [], []];
  skills.forEach((skill, i) => {
    rows[i % 3].push(skill);
  });
  return rows;
}

export const SkillMarqueeSection = ({ skills }: { skills: Skill[] }) => {
  const rows = splitRows(skills);

  return (
    <section
      id="skills-marquee"
      className="relative w-full bg-brand-black py-10 space-y-6 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 mx-auto flex items-center gap-4">
        <h2 className="font-gotham font-black text-brand-yellow text-3xl md:text-5xl lg:text-6xl tracking-tighter">
          Have some skills
        </h2>
        <motion.div
          className="transition-transform hover:rotate-45 duration-500 select-none"
          initial={{ scale: 0, rotate: 90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
          viewport={{ once: false }}
        >
          <Image
            src="/sun-yellow.svg"
            alt="Decorative Sun"
            width={100}
            height={100}
            className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
          />
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 md:gap-">
        {rows.map((row, rowIndex) =>
          row.length > 0 ? (
            <div key={rowIndex} className="overflow-hidden">
              <div
                className={`flex w-max items-center gap-4 pr-4 hover:[animation-play-state:paused] ${rowAnimations[rowIndex % rowAnimations.length]}`}
              >
                {[...row, ...row].map((skill, i) => (
                  <span
                    key={`${skill.id}-${i}`}
                    aria-hidden={i >= row.length}
                    className="shrink-0"
                  >
                    <SkillBadge name={skill.name} logoUrl={skill.logo} plain />
                  </span>
                ))}

                <motion.div
                  className="transition-transform hover:rotate-45 duration-500 select-none p-8 md:p-0"
                  initial={{ scale: 0, rotate: 90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <Image
                    src="/sun-yellow.svg"
                    alt="Decorative Sun"
                    width={100}
                    height={100}
                    className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
                  />
                </motion.div>
              </div>
            </div>
          ) : null,
        )}
      </div>

      {skills.length === 0 && (
        <p className="font-dm text-brand-red/60 text-lg">
          No skills added yet.
        </p>
      )}
    </section>
  );
};
