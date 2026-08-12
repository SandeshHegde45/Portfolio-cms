"use client";

import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { useHeroIntroTimeline } from "@/lib/hooks/useHeroIntroTimeline";
import { Container } from "@/components/ui/Container";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Button } from "@/components/ui/Button";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

export function HeroSection({ profile, contact }) {
  const sectionRef = useRef(null);
  useHeroIntroTimeline(sectionRef);

  const stats = [
    { label: "Location", value: profile.location },
    { label: "Status", value: profile.availability },
    { label: "Experience", value: `${profile.yearsOfExperience}+ yrs` }
  ];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <GridBackdrop />
      <div className="hero-tick absolute left-0 top-24 h-px w-full origin-left bg-ink-700" />
      <div className="hero-tick absolute bottom-24 left-0 h-px w-full origin-left bg-ink-700" />

      <Container className="relative flex flex-col gap-10 py-24">
        <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.35em] text-signal-400">
          {profile.title}
        </p>

        <RevealHeading
          text={profile.name}
          className="font-display text-5xl leading-[1.05] text-ink-50 sm:text-6xl lg:text-7xl"
        />

        <p className="hero-subtitle max-w-xl font-body text-lg text-ink-300">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <span className="hero-cta-item">
            <Button as="a" href="#projects" variant="primary">
              View work <ArrowDown size={15} />
            </Button>
          </span>
          <span className="hero-cta-item">
            <Button as="a" href={contact.resumeUrl} variant="outline" target="_blank" rel="noreferrer">
              Resume <Download size={15} />
            </Button>
          </span>
          <span className="hero-cta-item">
            <SocialLinks contact={contact} />
          </span>
        </div>

        <div className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-ink-700 pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-400">
                {stat.label}
              </span>
              <span className="font-body text-sm text-ink-100">{stat.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
