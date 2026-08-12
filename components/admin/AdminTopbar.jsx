"use client";

import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-ink-700 bg-ink-800/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="font-display text-sm text-ink-100">Content dashboard</p>
          <p className="font-mono text-xs text-ink-400">Manage everything shown on your portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-500 px-4 py-2 font-mono text-xs text-ink-200 hover:border-wire-400 hover:text-wire-400"
          >
            View site <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-ink-500 px-4 py-2 font-mono text-xs text-ink-200 hover:border-signal-400 hover:text-signal-400"
          >
            Log out <LogOut size={13} />
          </button>
        </div>
      </div>
    </header>
  );
}