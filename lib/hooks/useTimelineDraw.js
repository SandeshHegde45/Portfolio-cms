"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useTimelineDraw(scopeRef) {
  useGSAP(
    () => {
      const line = scopeRef.current?.querySelector(".timeline-line");
      const nodes = gsap.utils.toArray(".timeline-node", scopeRef.current);
      const items = gsap.utils.toArray(".timeline-item", scopeRef.current);

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: scopeRef.current,
              start: "top 70%",
              end: "bottom 85%",
              scrub: 0.6
            }
          }
        );
      }

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      if (nodes.length) {
        gsap.from(nodes, {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 70%"
          }
        });
      }
    },
    { scope: scopeRef }
  );
}
