import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminRepeatableList({ title, onAdd, addLabel, children }) {
  return (
    <div className="flex flex-col gap-6">
      {children}
      <Button type="button" variant="outline" onClick={onAdd} className="w-fit">
        <Plus size={14} /> {addLabel || `Add ${title}`}
      </Button>
    </div>
  );
}

export function AdminRepeatableItem({ title, onRemove, children }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-xl border border-ink-600 bg-ink-900/50 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-400">{title}</span>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove entry"
          className="text-ink-400 transition-colors hover:text-signal-500"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}
