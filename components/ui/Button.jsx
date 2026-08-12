import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { mergeRefs } from "@/lib/utils/mergeRefs";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";

const variantStyles = {
  primary: "bg-signal-500 text-zinc-950 hover:bg-signal-400 shadow-glow",
  outline:
    "border border-ink-500 text-ink-100 hover:border-wire-400 hover:text-wire-400",
  ghost: "text-ink-200 hover:text-signal-400"
};

export const Button = forwardRef(function Button(
  { as: Element = "button", variant = "primary", className, children, ...rest },
  ref
) {
  const { elementRef, onMouseEnter, onMouseLeave } = useHoverAnimation({
    scale: 1.04,
    y: -2
  });

  return (
    <Element
      ref={mergeRefs(ref, elementRef)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium transition-colors duration-300 ease-signal",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  );
});