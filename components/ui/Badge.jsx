import { cn } from "@/lib/utils/cn";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";

export function Badge({ children, className }) {
  const { elementRef, onMouseEnter, onMouseLeave } = useHoverAnimation({
    scale: 1.08,
    y: -1
  });

  return (
    <span
      ref={elementRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "inline-flex items-center rounded-full border border-ink-500 bg-ink-800 px-3 py-1 font-mono text-xs text-ink-200 transition-colors duration-300 hover:border-signal-400 hover:text-signal-400",
        className
      )}
    >
      {children}
    </span>
  );
}