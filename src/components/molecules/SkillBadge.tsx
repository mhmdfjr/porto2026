"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  name: string;
  logoUrl?: string | null;
  index?: number;
};

/** Skill badge: Supabase-hosted logo + name, or initial avatar. */
export function SkillBadge({ name, logoUrl, index = 0 }: Props) {
  const [failed, setFailed] = useState(false);
  const showAvatar = !logoUrl || failed;

  return (
    <motion.span
      className="inline-flex items-center gap-2 border border-brand-yellow bg-brand-red pr-4 min-w-max"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.07, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
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
            width={24}
            height={24}
            onError={() => setFailed(true)}
            className="h-6 w-6 object-contain"
          />
        </span>
      )}
      <span className="font-bold min-w-max text-sm text-brand-yellow md:text-base">
        {name}
      </span>
    </motion.span>
  );
}
