import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const AdminTextField = forwardRef(function AdminTextField(
  { label, error, className, textarea, ...rest },
  ref
) {
  const Element = textarea ? "textarea" : "input";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={rest.id} className="font-mono text-xs uppercase tracking-wide text-ink-400">
        {label}
      </label>
      <Element
        ref={ref}
        className={cn(
          "rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 font-body text-sm text-ink-100 outline-none transition-colors focus:border-signal-400",
          textarea && "resize-none"
        )}
        rows={textarea ? 4 : undefined}
        {...rest}
      />
      {error ? <span className="font-mono text-xs text-signal-500">{error}</span> : null}
    </div>
  );
});