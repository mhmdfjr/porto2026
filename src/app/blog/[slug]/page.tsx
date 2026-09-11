import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts, getContacts } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/organisms/FooterSection";

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
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/blog" className="text-sm text-neutral-400 hover:text-white">
          ← Semua artikel
        </Link>
        <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}{" "}
          • {post.reading_minutes} mnt baca
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.cover_image && (
          <div className="relative mt-8 h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}
        {/* Disanitasi saat simpan via sanitize-html di Server Action */}
        <div
          className="mt-8 space-y-4 leading-relaxed text-neutral-200 [&_a]:text-blue-400 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:pt-2 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-neutral-900 [&_pre]:p-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        {recommendations.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold">Artikel lainnya</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/blog/${rec.slug}`}
                  className="rounded-lg bg-neutral-900 p-4 hover:bg-neutral-800"
                >
                  <p className="font-semibold">{rec.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                    {rec.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <FooterSection contacts={contacts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </main>
  );
}
