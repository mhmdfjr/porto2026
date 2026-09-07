"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/supabase";

export const BlogSection = ({ posts }: { posts: Post[] }) => {
  const latest = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="relative bg-brand-black py-10 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full flex justify-between items-start z-10">
          <motion.h2
            className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-8 md:mb-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Blog
          </motion.h2>

          <motion.div
            className="transition-transform hover:rotate-45 duration-500 select-none p-8 md:p-0"
            initial={{ scale: 0, rotate: 90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
            viewport={{ once: false }}
          >
            <Image
              src="/sun-red.svg"
              alt="Decorative Sun"
              width={100}
              height={100}
              className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
          </motion.div>
        </div>

        {latest.length === 0 ? (
          <p className="font-dm text-brand-red/60 text-lg">
            No articles yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
              {latest.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col gap-4 group h-full"
                  >
                    {post.cover_image && (
                      <div className="relative w-full aspect-video bg-brand-yellow overflow-hidden">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-gotham font-black text-brand-red text-2xl md:text-3xl tracking-tight leading-none group-hover:underline">
                        {post.title}
                      </h3>
                      <p className="font-dm text-brand-red/80 text-sm md:text-base leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <p className="font-dm text-brand-red/60 text-xs md:text-sm">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : ""}{" "}
                        • {post.reading_minutes} mnt baca
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="flex justify-center mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Link
                href="/blog"
                className="px-8 py-3 border border-brand-red text-brand-red font-gotham font-bold uppercase text-sm hover:bg-brand-red hover:text-black transition-colors"
              >
                Lihat Semua Artikel
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
