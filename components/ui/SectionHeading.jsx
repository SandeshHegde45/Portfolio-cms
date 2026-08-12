import { cn } from "@/lib/utils/cn";

export function SectionHeading({ index, title, description, align = "left" }) {
  return (
    <div
      className={cn(
        "reveal-heading mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center"
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal-400">
        <span>{index}</span>
        <span className="h-px w-8 bg-signal-400/60" />
        <span>{title}</span>
      </div>
      {description ? (
        <p className="max-w-2xl font-body text-base text-ink-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
