"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectCard } from "../molecules/ProjectCard";
import { Button } from "../atoms/Button";
import type { Project } from "@/lib/supabase";

export const ProjectSection = ({ projects }: { projects: Project[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- official Embla subscription pattern
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    onSelect();
  }, [emblaApi, onSelect, projects]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  return (
    <section
      id="project"
      className="relative bg-brand-black py-10 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="w-full mx-auto space-y-6">
        <div className="w-full flex items-center justify-between z-10">
          <motion.h2
            className="font-gotham font-black text-brand-red text-3xl md:text-5xl lg:text-6xl tracking-tighter"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Some random projects:
          </motion.h2>

          <motion.div
            className="transition-transform hover:rotate-45 duration-500 select-none"
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

        {projects.length === 0 ? (
          <div className="w-full flex justify-center items-center h-32">
            <p className="font-dm text-brand-red/60 text-lg">
              No projects found.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6 md:-ml-8 cursor-grab active:cursor-grabbing">
                {projects.map((project, index) => {
                  const firstImage =
                    project.images && project.images.length > 0
                      ? project.images[0]
                      : null;

                  return (
                    <motion.div
                      key={project.id}
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 md:pl-8"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <ProjectCard
                        id={project.id}
                        title={project.name}
                        description={project.description}
                        tags={project.techstack}
                        live_url={project.live_url || null}
                        imageUrl={firstImage}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="w-full flex flex-row items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Button
                text="Prev"
                onClick={scrollPrev}
                variant="outline-red-black"
              />

              <div className="flex gap-1 md:gap-3 flex-wrap justify-center">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-3 h-3 md:w-5 md:h-5 rounded-full border-2 border-brand-red transition-all duration-300 ${
                      index === selectedIndex
                        ? "bg-brand-red"
                        : "bg-transparent hover:bg-brand-red/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                text="Next"
                onClick={scrollNext}
                variant="solid-red-black"
              />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
