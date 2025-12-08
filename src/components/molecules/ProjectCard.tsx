import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
}: ProjectCardProps) => {
  // LOGIC VALIDASI GAMBAR (SAFE URL):
  // 1. Pastikan imageUrl tidak null/undefined
  // 2. Pastikan tipe datanya string (bukan array kosong yg lolos check truthy)
  // 3. Pastikan diawali http (external) atau / (local)
  const isValidUrl =
    imageUrl &&
    typeof imageUrl === "string" &&
    (imageUrl.startsWith("http") || imageUrl.startsWith("/"));

  // Fallback ke sun-red.svg jika URL tidak valid
  const safeImageUrl = isValidUrl ? imageUrl : "/sun-red.svg";

  return (
    <div className="flex flex-col gap-6 w-full group h-full justify-between">
      <div>
        {/* --- Image Area --- */}
        <div className="relative w-full aspect-video bg-brand-yellow overflow-hidden">
          <Image
            src={safeImageUrl} // Gunakan URL aman
            alt={title || "Project Image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* --- Content Area --- */}
        <div className="flex flex-col gap-3 mt-6">
          <h3 className="font-gotham font-black text-brand-red text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none">
            {title}
          </h3>

          <p className="font-dm text-brand-red/80 text-sm md:text-base leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 font-dm font-bold text-brand-red text-xs md:text-sm mt-1">
            {tags && tags.length > 0 ? (
              tags.map((tag, i) => (
                <span key={i} className="opacity-80">
                  #{tag}
                </span>
              ))
            ) : (
              // Fallback jika tidak ada tags
              <span className="opacity-50 text-xs font-normal italic">
                No tags
              </span>
            )}
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 border border-brand-red text-brand-red font-gotham font-bold uppercase text-sm hover:bg-brand-red hover:text-black transition-colors">
          Learn More
        </button>
        <button className="px-6 py-2 bg-brand-red text-black font-gotham font-bold uppercase text-sm hover:bg-red-600 transition-colors">
          Live Demo
        </button>
      </div>
    </div>
  );
};
