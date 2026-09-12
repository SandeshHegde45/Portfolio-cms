"use client";

import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";

export function useModalAnimation(backdropRef, panelRef) {
  const router = useRouter();

  const { contextSafe } = useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
        )
        .fromTo(
          panelRef.current,
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
          "-=0.15",
        )
        .from(
          ".modal-reveal",
          { opacity: 0, y: 16, duration: 0.4, stagger: 0.07 },
          "-=0.25",
        );
    },
    { scope: backdropRef },
  );

  const closeWithAnimation = contextSafe(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => router.back(),
    });

    timeline
      .to(panelRef.current, { opacity: 0, y: 24, scale: 0.96, duration: 0.3 })
      .to(backdropRef.current, { opacity: 0, duration: 0.25 }, "-=0.2");
  });

  return { closeWithAnimation };
}
