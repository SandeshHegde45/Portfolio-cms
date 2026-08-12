"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { cn } from "@/lib/utils/cn";

export function NavLink({ href, index, label, isActive, onClick, className }) {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: linkRef });

  const handleEnter = contextSafe(() => {
    gsap.to(linkRef.current, { y: -2, duration: 0.25, ease: "power2.out" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(linkRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  });

  useGSAP(
    () => {
      if (!underlineRef.current) return;
      gsap.to(underlineRef.current, {
        scaleX: isActive ? 1 : 0,
        duration: 0.35,
        ease: "power3.out"
      });
    },
    { dependencies: [isActive], scope: linkRef }
  );

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "nav-item relative flex items-center gap-2 font-mono text-xs uppercase tracking-wide transition-colors duration-300",
        isActive ? "text-signal-400" : "text-ink-300 hover:text-signal-400",
        className
      )}
    >
      <span className="text-signal-500">{index}</span>
      {label}
      <span
        ref={underlineRef}
        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal-400"
      />
    </a>
  );
}