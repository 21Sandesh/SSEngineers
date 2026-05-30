"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DangerZone() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function reset() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "Reset failed" }));
        setError(j.error ?? "Reset failed");
        return;
      }
      setDone(true);
      setConfirm("");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-amber/40 bg-amber-tint/40 p-5">
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-amber-deep">
        Danger zone
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Permanently delete all visitor sessions and events. Useful to clear test data
        before going live. This cannot be undone.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 rounded border border-amber-deep px-3 py-1.5 text-xs font-semibold text-amber-deep hover:bg-amber-deep hover:text-white transition-colors"
        >
          Clear all analytics data…
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink">
            Type <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">DELETE</code> to confirm:
          </p>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="DELETE"
            className="w-full max-w-xs rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-amber-deep focus:ring-2 focus:ring-amber/20"
          />
          {error && <p className="text-sm text-amber-deep">{error}</p>}
          {done && <p className="text-sm font-semibold text-brand-deep">✓ All analytics data cleared.</p>}
          <div className="flex gap-2">
            <button
              onClick={reset}
              disabled={busy || confirm !== "DELETE"}
              className="rounded bg-amber-deep px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-deep/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Clearing…" : "Confirm delete"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setConfirm("");
                setError(null);
                setDone(false);
              }}
              disabled={busy}
              className="rounded border border-line-strong px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-ink hover:bg-ink hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
