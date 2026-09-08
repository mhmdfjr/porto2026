import { HeroSection } from "@/components/organisms/HeroSection";
import {
  getHeroGalleryImages,
  getQuoteImages,
  getSkillImage,
} from "@/lib/unsplash";
import { FeatureSection } from "@/components/organisms/FeatureSection"; // Import komponen baru
import { AboutSection } from "@/components/organisms/AboutSection";
import { WorkSection } from "@/components/organisms/WorkSection";
import { GallerySection } from "@/components/organisms/GallerySection";
import { SkillSection } from "@/components/organisms/SkillSection";
import { SkillMarqueeSection } from "@/components/organisms/SkillMarqueeSection";
import { ProjectSection } from "@/components/organisms/ProjectSection";
import { BlogSection } from "@/components/organisms/BlogSection";
import { QuotesSection } from "@/components/organisms/QuoteSection";
import { MottoSection } from "@/components/organisms/MottoSection";
import { FooterSection } from "@/components/organisms/FooterSection";
import {
  getWorks,
  getSkills,
  getFeatures,
  getProjects,
  getPublishedPosts,
  getContacts,
} from "@/lib/database";

export const revalidate = 60;

export default async function Home() {
  const [
    works,
    skills,
    features,
    projects,
    posts,
    contacts,
    heroImages,
    quoteImages,
    skillImage,
  ] = await Promise.all([
    getWorks(),
    getSkills(),
    getFeatures(),
    getProjects(),
    getPublishedPosts(),
    getContacts(),
    getHeroGalleryImages(),
    getQuoteImages(),
    getSkillImage(),
  ]);

  return (
    <main>
      <HeroSection images={heroImages} contacts={contacts} />
      <AboutSection />
      {/* <FeatureSection features={features} /> */}
      <MottoSection text="Be Your Own Muse" />
      <WorkSection works={works} />
      {/* <GallerySection /> */}
      {/* <SkillSection skills={skills} image={skillImage} /> */}
      <ProjectSection projects={projects} />
      <SkillMarqueeSection skills={skills} />
      {/* <QuotesSection images={quoteImages} /> */}
      <BlogSection posts={posts} />
      <FooterSection contacts={contacts} />
    </main>
  );
}
