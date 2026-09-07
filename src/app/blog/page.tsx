import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getContacts } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/organisms/FooterSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: `Artikel dan catatan ${siteConfig.name} seputar web development, Next.js, dan teknologi modern.`,
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Artikel dan catatan ${siteConfig.name} seputar web development.`,
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default async function BlogPage() {
  const [posts, contacts] = await Promise.all([
    getPublishedPosts(),
    getContacts(),
  ]);

  return (
    <main className="bg-brand-black text-white">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-2 text-neutral-400">
          Artikel dan catatan seputar web development.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-neutral-500">Belum ada artikel.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="overflow-hidden rounded-lg bg-neutral-900 transition hover:bg-neutral-800"
              >
                {post.cover_image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-neutral-500">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                    {" • "}
                    {post.reading_minutes} mnt baca
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <FooterSection contacts={contacts} />
    </main>
  );
}
