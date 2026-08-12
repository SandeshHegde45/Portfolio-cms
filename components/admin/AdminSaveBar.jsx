import { Button } from "@/components/ui/Button";

const statusCopy = {
  idle: "",
  saving: "Saving…",
  saved: "Saved",
  error: "Something went wrong. Try again."
};

export function AdminSaveBar({ status, disabled }) {
  return (
    <div className="flex items-center gap-4 border-t border-ink-700 pt-6">
      <Button type="submit" variant="primary" disabled={disabled}>
        Save changes
      </Button>
      {status !== "idle" ? (
        <span
          className={
            status === "error"
              ? "font-mono text-xs text-signal-500"
              : "font-mono text-xs text-wire-400"
          }
        >
          {statusCopy[status]}
        </span>
      ) : null}
    </div>
  );
}
