"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function SkillMeter({ name, level }) {
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useGSAP(
    () => {
      if (!fillRef.current) return;

      gsap.to(fillRef.current, {
        width: `${level}%`,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      });
    },
    { scope: trackRef, dependencies: [level] }
  );

  return (
    <div ref={trackRef} className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-body text-sm text-ink-100">
        <span>{name}</span>
        <span className="font-mono text-xs text-ink-300">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
        <div
          ref={fillRef}
          className="h-full w-0 rounded-full bg-gradient-to-r from-signal-500 to-wire-400"
        />
      </div>
    </div>
  );
}
