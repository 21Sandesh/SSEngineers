"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "Login failed" }));
        setError(j.error ?? "Login failed");
        return;
      }
      const next = params?.get("from") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-lg bg-surface p-8 shadow-card-md">
      <p className="mono-label">S.S. Engineers</p>
      <h1 className="display-tight mt-2 text-2xl text-ink">Admin sign-in</h1>
      <p className="mt-2 text-sm text-ink-soft">Enter the admin password to view analytics.</p>

      <label className="mono-label mb-2 mt-6 block">Password</label>
      <input
        type="password"
        autoFocus
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
      />

      {error && (
        <div className="mt-4 rounded bg-amber-tint border border-amber/20 px-4 py-3 text-sm text-amber-deep">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy || !password}
        className="btn-primary mt-6 w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
