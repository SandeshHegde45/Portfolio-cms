"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useHeroIntroTimeline(scopeRef) {
  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      timeline
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
        .fromTo(
          ".hero-heading-word",
          { opacity: 0, y: 48, rotateX: -35 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.08
          },
          "-=0.15"
        )
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(
          ".hero-cta-item",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(
          ".hero-tick",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut", stagger: 0.04 },
          "-=0.9"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 },
          "-=0.6"
        );
    },
    { scope: scopeRef }
  );
}
