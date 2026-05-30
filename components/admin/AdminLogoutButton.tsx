"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={logout}
      disabled={busy}
      className="rounded border border-line-strong px-3 py-1 text-xs font-semibold text-ink-soft hover:border-ink hover:bg-ink hover:text-white disabled:opacity-60"
    >
      {busy ? "…" : "Sign out"}
    </button>
  );
}
