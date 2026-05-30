"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ss_consent";

export default function ConsentBanner() {
  const [choice, setChoice] = useState<"accepted" | "rejected" | null | "loading">("loading");

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "accepted" || v === "rejected") setChoice(v);
      else setChoice(null);
    } catch {
      setChoice(null);
    }
  }, []);

  function decide(v: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setChoice(v);
  }

  if (choice === "loading" || choice === "accepted" || choice === "rejected") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-lg border border-white/10 bg-night/95 px-5 py-4 text-white shadow-card-lg backdrop-blur sm:bottom-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/80">
          We use cookies and minimal analytics to understand how visitors use our site and improve
          it. See our{" "}
          <Link href="/privacy" className="text-amber underline hover:text-amber-deep">
            privacy notice
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
          >
            Reject
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded bg-amber px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-deep"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
