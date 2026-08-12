"use client";

import { useRef } from "react";
import { useTimelineDraw } from "@/lib/hooks/useTimelineDraw";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function ExperienceSection({ experience }) {
  const sectionRef = useRef(null);
  useTimelineDraw(sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading
          index="04"
          title="Experience"
          description="Roles I have held, in chronological order."
        />

        <div className="relative flex flex-col gap-8">
          <span className="timeline-line absolute left-[5px] top-2 h-full w-px origin-top bg-ink-600" />
          {experience.map((item) => (
            <TimelineItem
              key={item.id}
              title={item.role}
              subtitle={item.company}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              isCurrent={item.current}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
