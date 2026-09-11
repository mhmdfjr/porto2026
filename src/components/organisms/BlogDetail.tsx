"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Post } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { Tag } from "@/components/atoms/Tag";
import { BackButton } from "@/components/atoms/BackButton";
import { BlogRecommendationSection } from "@/components/organisms/BlogRecommendation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

interface BlogDetailSectionProps {
  post: Post;
  recommendations?: Post[];
}

export const BlogDetailSection = ({
  post,
  recommendations = [],
}: BlogDetailSectionProps) => {
  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-brand-black">
        <h1 className="font-gotham text-brand-red text-4xl">
          Article Not Found
        </h1>
        <BackButton href="/blog" label="Back to Blog" />
      </div>
    );
  }

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className="relative w-full bg-brand-black overflow-hidden selection:bg-brand-red selection:text-black">
      <div className="relative z-10 mx-auto px-6 md:px-12 pt-24 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false }}
          className="space-y-2"
        >
          <BackButton href="/blog" label="Back to Blog" />
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-6 lg:gap-10"
          id="side-content"
        >
          <motion.article
            className="lg:col-span-4 flex flex-col py-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div className="flex flex-col gap-1">
              <h1 className="font-gotham font-black text-brand-yellow text-2xl md:text-3xl lg:text-4xl leading-tight">
                {post.title}
              </h1>
              <p className="font-dm text-brand-yellow/80 text-sm md:text-base">
                {publishedDate}
                {publishedDate ? " • " : ""}
                {post.reading_minutes} min read
              </p>
            </div>

            {post.cover_image && (
              <motion.div
                className="relative w-full aspect-video md:aspect-21/9 bg-brand-red/40 overflow-hidden group"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: false }}
              >
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Disanitasi saat simpan via sanitize-html di Server Action */}
            <motion.div
              className="font-dm text-brand-yellow text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line [&_a]:text-brand-red [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-brand-red [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:pt-4 [&_h2]:font-gotham [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:pt-2 [&_h3]:font-gotham [&_h3]:text-xl [&_h3]:font-semibold [&_img]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-neutral-900 [&_pre]:p-4 [&_ul]:list-disc [&_ul]:pl-6"
              variants={itemVariants}
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </motion.article>

          <motion.div
            className="lg:col-span-2 flex flex-col py-6 space-y-6 lg:border-l lg:pl-10 lg:border-brand-yellow"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {post.tags && post.tags.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-2">
                <h4 className="font-gotham font-bold text-brand-yellow text-lg md:text-xl uppercase">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} variant="yellow" />
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-2">
              <h4 className="font-gotham font-bold text-brand-yellow text-lg md:text-xl uppercase">
                Share
              </h4>
              <div className="flex gap-4 text-brand-yellow/60">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    articleUrl,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-yellow transition-colors font-dm font-bold"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    articleUrl,
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-yellow transition-colors font-dm font-bold"
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} ${articleUrl}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-brand-yellow transition-colors font-dm font-bold"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <BlogRecommendationSection recommendations={recommendations} />

            <motion.div
              className="w-max"
              variants={itemVariants}
              initial={{ scale: 0, rotate: 90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <Image
                src="/sun-yellow.svg"
                alt="Decorative Sun"
                width={140}
                height={140}
                className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
