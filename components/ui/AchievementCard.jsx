import { Award, ArrowUpRight } from "lucide-react";
import { formatYearMonth } from "@/lib/utils/formatDateRange";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";

export function AchievementCard({ achievement }) {
  const { elementRef, onMouseEnter, onMouseLeave } = useHoverAnimation({
    scale: 1.02,
    y: -4
  });

  const content = (
    <div
      ref={elementRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="achievement-card flex h-full flex-col gap-4 rounded-2xl border border-ink-600 bg-ink-800 p-6 transition-colors duration-300 hover:border-signal-400/60"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-400">
          <Award size={18} />
        </span>
        <span className="font-mono text-xs text-ink-300">
          {formatYearMonth(achievement.date)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-display text-base text-ink-100">{achievement.title}</h3>
        <p className="font-mono text-xs uppercase tracking-wide text-wire-400">
          {achievement.issuer}
        </p>
        {achievement.description ? (
          <p className="mt-2 font-body text-sm text-ink-300">{achievement.description}</p>
        ) : null}
      </div>
      {achievement.url ? (
        <span className="inline-flex items-center gap-1 font-mono text-xs text-signal-400">
          View credential <ArrowUpRight size={13} />
        </span>
      ) : null}
    </div>
  );

  if (achievement.url) {
    return (
      <a href={achievement.url} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}