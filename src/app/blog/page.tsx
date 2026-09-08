import type { Metadata } from "next";
import { getPublishedPosts, getContacts } from "@/lib/database";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/molecules/Navbar";
import { BlogCard } from "@/components/molecules/BlogCard";
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
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 pt-32 pb-20 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-gotham font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            Blogs
          </h1>
          <p className="font-bold text-brand-red">
            I write random articles about tech.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 font-dm text-brand-red text-lg">
            There is no articles yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.cover_image}
                tags={post.tags ?? []}
                publishedAt={post.published_at}
                readingMinutes={post.reading_minutes}
              />
            ))}
          </div>
        )}
      </section>
      <FooterSection contacts={contacts} />
    </main>
  );
}
