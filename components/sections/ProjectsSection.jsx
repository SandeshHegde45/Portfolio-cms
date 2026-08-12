"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection({ projects }) {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, ".project-card", {
    stagger: 0.12,
    from: { opacity: 0, y: 60 }
  });

  return (
    <section id="projects" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading
          index="03"
          title="Projects"
          description="A selection of things I have built, from full applications to smaller experiments."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
