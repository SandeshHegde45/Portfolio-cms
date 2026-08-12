"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";

export function AchievementsSection({ achievements }) {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, ".achievement-card", {
    stagger: 0.1,
    from: { opacity: 0, scale: 0.9, y: 24 },
    to: { opacity: 1, scale: 1, y: 0 }
  });

  return (
    <section id="achievements" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading index="06" title="Achievements" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </Container>
    </section>
  );
}
