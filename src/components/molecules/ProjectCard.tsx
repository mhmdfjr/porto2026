import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../atoms/Button";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  imageUrl: string | null;
}

export const ProjectCard = ({
  id,
  title,
  description,
  tags,
  live_url,
  imageUrl,
}: ProjectCardProps) => {
  const isValidUrl =
    imageUrl &&
    typeof imageUrl === "string" &&
    (imageUrl.startsWith("http") || imageUrl.startsWith("/"));

  const safeImageUrl = isValidUrl ? imageUrl : "/sun-red.svg";

  return (
    <div className="flex flex-col gap-6 w-full group h-full justify-between">
      <div>
        <div className="relative w-full aspect-video bg-brand-yellow overflow-hidden">
          <Image
            src={safeImageUrl}
            alt={title || "Project Image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-gotham font-black text-brand-red text-xl md:text-2xl lg:text-3xl tracking-tight leading-none">
            {title}
          </h3>

          <p className="font-dm text-brand-red/80 text-sm md:text-base leading-relaxed line-clamp-2">
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
              <span className="opacity-50 text-xs font-normal italic">
                No tags
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          text="Learn more"
          href={`/project/${id}`}
          size="sm"
          variant="outline-red-black"
        />
        <Button
          text="Live demo"
          href={live_url ? live_url : `#`}
          size="sm"
          variant="solid-red-black"
        />
      </div>
    </div>
  );
};
