import { formatDateRange } from "@/lib/utils/formatDateRange";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";

export function TimelineItem({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  isCurrent,
  description
}) {
  const { elementRef, onMouseEnter, onMouseLeave } = useHoverAnimation({
    scale: 1.01,
    y: -3
  });

  return (
    <div className="timeline-item relative pl-12">
      <span className="timeline-node absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-signal-400 bg-ink-900" />
      <div
        ref={elementRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex flex-col gap-1 rounded-xl border border-ink-600 bg-ink-800/60 p-5 transition-colors duration-300 hover:border-signal-400/50"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg text-ink-100">{title}</h3>
          <span className="font-mono text-xs text-signal-400">
            {formatDateRange(startDate, endDate, isCurrent)}
          </span>
        </div>
        <p className="font-body text-sm text-wire-400">
          {subtitle}
          {location ? <span className="text-ink-300"> · {location}</span> : null}
        </p>
        {description ? (
          <p className="mt-2 font-body text-sm text-ink-300">{description}</p>
        ) : null}
      </div>
    </div>
  );
}