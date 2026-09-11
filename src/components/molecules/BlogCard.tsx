import Image from "next/image";
import Link from "next/link";
import { Button } from "../atoms/Button";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  publishedAt: string | null;
  readingMinutes: number;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const BlogCard = ({
  slug,
  title,
  excerpt,
  coverImage,
  tags,
  publishedAt,
  readingMinutes,
}: BlogCardProps) => {
  const isValidUrl =
    coverImage &&
    typeof coverImage === "string" &&
    (coverImage.startsWith("http") || coverImage.startsWith("/"));

  const safeImageUrl = isValidUrl ? coverImage : "/sun-red.svg";

  return (
    <div className="flex flex-col gap-6 w-full group h-full justify-between">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative w-full aspect-video bg-brand-yellow overflow-hidden">
          <Image
            src={safeImageUrl}
            alt={title || "Blog Cover"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-gotham font-black text-brand-red text-lg md:text-xl lg:text-2xl tracking-tight leading-none">
            {title}
          </h3>

          <p className="font-dm text-brand-red text-sm md:text-base leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          <div className="flex flex-wrap gap-2 font-dm font-bold text-brand-red text-xs md:text-sm mt-1">
            {tags && tags.length > 0 ? (
              tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="opacity-80">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="opacity-50 text-xs font-normal italic">
                No tags
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Button
          text="Read more"
          href={`/blog/${slug}`}
          size="sm"
          variant="outline-red-black"
        />
        <p className="font-dm text-brand-red/60 text-xs md:text-sm">
          {formatDate(publishedAt)} • {readingMinutes} mins read
        </p>
      </div>
    </div>
  );
};
