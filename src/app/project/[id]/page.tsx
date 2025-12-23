"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/lib/database";
import type { Project } from "@/lib/supabase";
import { Navbar } from "@/components/molecules/Navbar";
import { FooterSection } from "@/components/orgamisms/FooterSection";
import { ProjectDetailSection } from "@/components/orgamisms/ProjectDetail";
import { ProjectRecommendationSection } from "@/components/orgamisms/ProjectRecomendation";

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [project, setProject] = useState<Project | null>(null);
  const [recommendations, setRecommendations] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        const allProjects = await getProjects();
        console.log(allProjects);

        // Cari project yang sedang dibuka
        const current = allProjects.find((p) => p.id === id);
        console.log(current);

        // Cari rekomendasi (Project lain selain yang sedang dibuka)
        const others = allProjects.filter((p) => p.id !== id).slice(0, 2);

        if (current) setProject(current);
        setRecommendations(others);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }
    fetchData();
  }, [id]);
  return (
    <main>
      <Navbar />
      <ProjectDetailSection project={project} loading={!project} />
      <ProjectRecommendationSection recommendations={recommendations} />
      <FooterSection />
    </main>
  );
}
