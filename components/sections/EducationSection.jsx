"use client";

import { useRef } from "react";
import { useTimelineDraw } from "@/lib/hooks/useTimelineDraw";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function EducationSection({ education }) {
  const sectionRef = useRef(null);
  useTimelineDraw(sectionRef);

  return (
    <section id="education" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading index="05" title="Education" />

        <div className="relative flex flex-col gap-8">
          <span className="timeline-line absolute left-[5px] top-2 h-full w-px origin-top bg-ink-600" />
          {education.map((item) => (
            <TimelineItem
              key={item.id}
              title={item.degree}
              subtitle={item.institution}
              startDate={item.startDate}
              endDate={item.endDate}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
