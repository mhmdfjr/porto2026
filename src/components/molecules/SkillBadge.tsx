"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  name: string;
  logoUrl?: string | null;
  index?: number;
  plain?: boolean;
};

export function SkillBadge({ name, logoUrl, index = 0, plain = false }: Props) {
  const [failed, setFailed] = useState(false);
  const showAvatar = !logoUrl || failed;

  const inner = (
    <>
      {showAvatar ? (
        <span
          aria-hidden
          className="flex h-full aspect-square items-center justify-center bg-brand-yellow text-xl font-gotham font-bold text-brand-red p-2"
        >
          {name.trim().charAt(0).toUpperCase() || "•"}
        </span>
      ) : (
        <span className="flex h-full aspect-square items-center justify-center bg-brand-yellow p-2">
          <Image
            src={logoUrl}
            alt=""
            width={32}
            height={32}
            onError={() => setFailed(true)}
            className="h-8 w-8 object-contain"
          />
        </span>
      )}
      <span className="font-dm font-bold min-w-max text-sm text-brand-yellow md:text-base">
        {name}
      </span>
    </>
  );

  if (plain) {
    return (
      <span className="inline-flex items-center gap-2 border-2 border-brand-yellow bg-transparent pr-4 min-w-max">
        {inner}
      </span>
    );
  }

  return (
    <motion.span
      className="inline-flex items-center gap-2 border-2 border-brand-yellow bg-transparent pr-4 min-w-max"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.07, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {inner}
    </motion.span>
  );
}
