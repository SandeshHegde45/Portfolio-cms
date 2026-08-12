"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { password: "" } });

  const onSubmit = async ({ password }) => {
    setAuthError("");

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setAuthError("Incorrect password. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-ink-600 bg-ink-800 p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-400">
          <Lock size={16} />
        </span>
        <div>
          <h1 className="font-display text-lg text-ink-100">Admin access</h1>
          <p className="font-mono text-xs text-ink-400">Sign in to manage your content</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-mono text-xs uppercase tracking-wide text-ink-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          className="rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 font-body text-sm text-ink-100 outline-none transition-colors focus:border-signal-400"
          {...register("password", { required: "Enter your admin password." })}
        />
        {errors.password ? (
          <span className="font-mono text-xs text-signal-500">{errors.password.message}</span>
        ) : null}
        {authError ? (
          <span className="font-mono text-xs text-signal-500">{authError}</span>
        ) : null}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
