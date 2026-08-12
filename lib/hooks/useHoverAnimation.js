"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useHoverAnimation({
  scale = 1.05,
  y = 0,
  duration = 0.3,
  ease = "power3.out",
} = {}) {
  const elementRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: elementRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(elementRef.current, { scale, y, duration, ease });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(elementRef.current, { scale: 1, y: 0, duration, ease });
  });

  return { elementRef, onMouseEnter, onMouseLeave };
}
