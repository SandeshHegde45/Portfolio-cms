"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useRevealOnScroll(scopeRef, targetSelector, options = {}) {
  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    start = "top 82%"
  } = options;

  useGSAP(
    () => {
      const targets = gsap.utils.toArray(targetSelector);
      if (!targets.length) return;

      gsap.fromTo(targets, from, {
        ...to,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          toggleActions: "play none none reverse"
        }
      });
    },
    { scope: scopeRef, dependencies: [targetSelector] }
  );
}
