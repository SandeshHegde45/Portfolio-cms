"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

export function ScrollProgressBar() {
  const barRef = useRef(null);
  useScrollProgress(barRef);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-ink-700">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-wire-400"
      />
    </div>
  );
}
