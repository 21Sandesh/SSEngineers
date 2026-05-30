"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

const RANGES = [
  { value: 1, label: "24h" },
  { value: 7, label: "7d" },
  { value: 30, label: "30d" },
  { value: 90, label: "90d" },
];

export default function RangePicker({ current }: { current: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setRange(days: number) {
    const sp = new URLSearchParams(params?.toString());
    sp.set("days", String(days));
    startTransition(() => {
      router.push(`${pathname}?${sp.toString()}`);
    });
  }

  return (
    <div
      className={`inline-flex overflow-hidden rounded border border-line-strong transition-opacity ${
        pending ? "opacity-60" : ""
      }`}
    >
      {RANGES.map((r) => {
        const isActive = current === r.value;
        const isLoading = pending && isActive;
        return (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            disabled={pending}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-wait ${
              isActive ? "bg-ink text-white" : "bg-surface text-ink-soft hover:bg-paper"
            }`}
          >
            {isLoading && (
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
