import { readContent } from "@/lib/data/contentRepository";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await readContent();

  return (
    <>
      <ScrollProgressBar />
      <SiteNavbar profileName={content.profile.name} />
      <main>
        <HeroSection profile={content.profile} contact={content.contact} />
        <AboutSection profile={content.profile} />
        <SkillsSection skills={content.skills} />
        <ProjectsSection projects={content.projects} />
        <ExperienceSection experience={content.experience} />
        <EducationSection education={content.education} />
        <AchievementsSection achievements={content.achievements} />
        <ContactSection profile={content.profile} contact={content.contact} />
      </main>
      <SiteFooter profileName={content.profile.name} />
    </>
  );
}
