"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "../molecules/ProjectCard";
import { getProjects } from "@/lib/database";
import type { Project } from "@/lib/supabase";

export const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // --- EMBLA CAROUSEL SETUP ---
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Fetch Data Supabase
  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Sync Embla State (Dots & Selection)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    onSelect();
  }, [emblaApi, onSelect, projects]);

  // Navigasi Manual
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section
      id="projects"
      className="relative bg-brand-black py-20 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-gotham font-black text-brand-red text-5xl md:text-6xl lg:text-8xl tracking-tighter mb-16">
          Project
        </h2>

        {loading ? (
          <div className="w-full flex justify-center items-center h-64">
            <p className="font-dm text-brand-red text-xl animate-pulse">
              Loading projects...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="w-full flex justify-center items-center h-32">
            <p className="font-dm text-brand-red/60 text-lg">
              No projects found.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6 md:-ml-8 cursor-grab active:cursor-grabbing">
                {projects.map((project) => {
                  // LOGIKA PENGAMBILAN GAMBAR UTAMA:
                  // Ambil elemen pertama dari array 'image', jika ada.
                  const firstImage =
                    project.image && project.image.length > 0
                      ? project.image[0]
                      : null;

                  return (
                    <div
                      key={project.id}
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 md:pl-8"
                    >
                      <ProjectCard
                        title={project.name}
                        description={project.description}
                        tags={project.techstack}
                        imageUrl={firstImage} // Pass URL gambar pertama
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- CONTROLS --- */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 mt-16 md:mt-20">
              <button
                onClick={scrollPrev}
                className="hidden md:flex px-8 py-3 border border-brand-red text-brand-red font-gotham font-bold text-lg hover:bg-brand-red hover:text-black transition-colors"
              >
                Prev
              </button>

              <div className="flex gap-4 flex-wrap justify-center">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-brand-red transition-all duration-300 ${
                      index === selectedIndex
                        ? "bg-brand-red"
                        : "bg-transparent hover:bg-brand-red/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                className="px-8 py-3 bg-brand-red text-black font-gotham font-bold text-lg hover:bg-red-600 transition-colors"
              >
                Next
              </button>
            </div>

            <div className="md:hidden flex justify-center mt-6">
              <button
                onClick={scrollPrev}
                className="px-8 py-3 border border-brand-red text-brand-red font-gotham font-bold text-lg hover:bg-brand-red hover:text-black transition-colors"
              >
                Prev
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
