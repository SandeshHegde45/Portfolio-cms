"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useScrollProgress(barRef) {
  useGSAP(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });
  });
}
