import { HeroSection } from "@/components/orgamisms/HeroSection";
import { FeatureSection } from "@/components/orgamisms/FeatureSection"; // Import komponen baru
import { AboutSection } from "@/components/orgamisms/AboutSection";
import { WorkSection } from "@/components/orgamisms/WorkSection";
import { GallerySection } from "@/components/orgamisms/GallerySection";
import { SkillSection } from "@/components/orgamisms/SkillSection";
import { ProjectSection } from "@/components/orgamisms/ProjectSection";
import { QuotesSection } from "@/components/orgamisms/QuoteSection";
import { EducationSection } from "@/components/orgamisms/EducationSection";
import { MottoSection } from "@/components/orgamisms/MottoSection";
import { OrganizationSection } from "@/components/orgamisms/OrganizationSection";
import { FooterSection } from "@/components/orgamisms/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <WorkSection />
      <GallerySection />
      <SkillSection />
      <ProjectSection />
      <QuotesSection />
      <EducationSection />
      <MottoSection text="Be Your Own Muse" />
      <OrganizationSection />
      <FooterSection />
    </main>
  );
}
