import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts, getContacts, getApprovedComments } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/organisms/FooterSection";
import { BlogDetailSection } from "@/components/organisms/BlogDetail";
import { CommentSection } from "@/components/organisms/CommentSection";

export const revalidate = 60;

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.cover_image ?? `${siteConfig.url}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt.slice(0, 160),
      url: canonicalUrl,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [siteConfig.name],
      tags: post.tags ?? [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const contacts = await getContacts();
  const comments = await getApprovedComments("post", post.slug);
  const recommendations = allPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 2);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ?? `${siteConfig.url}/opengraph-image`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Mohamad Fajar Nur Khasani",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Mohamad Fajar Nur Khasani",
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <main className="bg-brand-black text-white">
      <Navbar />
      <BlogDetailSection post={post} recommendations={recommendations} />
      <CommentSection targetType="post" targetSlug={post.slug} comments={comments} />
      <FooterSection contacts={contacts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </main>
  );
}
