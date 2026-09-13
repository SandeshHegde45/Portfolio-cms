/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection({ profile }) {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, ".about-reveal", { stagger: 0.15 });

  return (
    <section id="about" ref={sectionRef} className="py-28">
      <Container>
        <SectionHeading index="01" title="About" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="about-reveal flex flex-col gap-6">
            <p className="font-display text-2xl leading-relaxed text-ink-100 sm:text-3xl">
              {profile.bio}
            </p>
          </div>

          <div className="about-reveal relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-ink-600 bg-ink-800 lg:justify-self-end">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
