"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillMeter } from "@/components/ui/SkillMeter";

function groupByCategory(skills) {
  return skills.reduce((groups, skill) => {
    const category = skill.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push(skill);
    return groups;
  }, {});
}

export function SkillsSection({ skills }) {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, ".skill-group", { stagger: 0.12 });

  const grouped = groupByCategory(skills);
  const categories = Object.keys(grouped);

  return (
    <section id="skills" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading
          index="02"
          title="Skills"
          description="Languages, frameworks, and tools I reach for most often."
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="skill-group flex flex-col gap-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">
                {category}
              </h3>
              <div className="flex flex-col gap-5">
                {grouped[category].map((skill) => (
                  <SkillMeter key={skill.id} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
