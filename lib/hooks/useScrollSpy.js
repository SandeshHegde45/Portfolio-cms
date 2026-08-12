"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap/gsapConfig";

export function useScrollSpy(items) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");

  useGSAP(
    () => {
      const triggers = items
        .map((item) => {
          const target = document.querySelector(item.href);
          if (!target) return null;

          return ScrollTrigger.create({
            trigger: target,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setActiveHref(item.href);
            },
          });
        })
        .filter(Boolean);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [items] },
  );

  return activeHref;
}
