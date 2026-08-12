import { cn } from "@/lib/utils/cn";

export function GridBackdrop({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-blueprint bg-blueprint [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]",
        className
      )}
    />
  );
}
