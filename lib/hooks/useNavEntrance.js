"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useNavEntrance(scopeRef) {
  useGSAP(
    () => {
      gsap.from(".nav-item", {
        opacity: 0,
        y: -12,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.15
      });
    },
    { scope: scopeRef }
  );
}
