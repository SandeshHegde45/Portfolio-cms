"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { useTheme } from "@/lib/theme/ThemeProvider";

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const handleClick = contextSafe(() => {
    gsap.fromTo(
      iconRef.current,
      { rotate: -90, opacity: 0, scale: 0.5 },
      { rotate: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" }
    );
    toggleTheme();
  });

  const handleEnter = contextSafe(() => {
    gsap.to(buttonRef.current, { scale: 1.12, duration: 0.25, ease: "power2.out" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
  });

  const isLight = mounted && theme === "light";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label="Toggle color theme"
      className={
        className ||
        "flex h-9 w-9 items-center justify-center rounded-full border border-ink-500 text-ink-100 transition-colors duration-300 hover:border-signal-400 hover:text-signal-400"
      }
    >
      <span ref={iconRef} className="flex items-center justify-center">
        {isLight ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  );
}