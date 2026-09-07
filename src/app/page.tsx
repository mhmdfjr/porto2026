import { HeroSection } from "@/components/organisms/HeroSection";
import { FeatureSection } from "@/components/organisms/FeatureSection"; // Import komponen baru
import { AboutSection } from "@/components/organisms/AboutSection";
import { WorkSection } from "@/components/organisms/WorkSection";
import { GallerySection } from "@/components/organisms/GallerySection";
import { SkillSection } from "@/components/organisms/SkillSection";
import { ProjectSection } from "@/components/organisms/ProjectSection";
import { BlogSection } from "@/components/organisms/BlogSection";
import { QuotesSection } from "@/components/organisms/QuoteSection";
import { EducationSection } from "@/components/organisms/EducationSection";
import { MottoSection } from "@/components/organisms/MottoSection";
import { OrganizationSection } from "@/components/organisms/OrganizationSection";
import { FooterSection } from "@/components/organisms/FooterSection";
import {
  getWorks,
  getSkills,
  getFeatures,
  getProjects,
  getPublishedPosts,
  getEducations,
  getOrganizations,
  getContacts,
} from "@/lib/database";

// Homepage is statically rendered and revalidated every minute.
// All dynamic lists are fetched ONCE on the server (parallel) and
// passed as props, so crawlers and first paint see full content
// instead of "Loading..." shells.
export const revalidate = 60;

export default async function Home() {
  const [works, skills, features, projects, posts, educations, organizations, contacts] =
    await Promise.all([
      getWorks(),
      getSkills(),
      getFeatures(),
      getProjects(),
      getPublishedPosts(),
      getEducations(),
      getOrganizations(),
      getContacts(),
    ]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeatureSection features={features} />
      <WorkSection works={works} />
      <GallerySection />
      <SkillSection skills={skills} />
      <ProjectSection projects={projects} />
      <QuotesSection />
      <EducationSection educations={educations} />
      <MottoSection text="Be Your Own Muse" />
      <BlogSection posts={posts} />
      <OrganizationSection organizations={organizations} />
      <FooterSection contacts={contacts} />
    </main>
  );
}
