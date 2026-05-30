"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/track";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export default function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firedScrolls = useRef<Set<number>>(new Set());
  const lastPath = useRef<string | null>(null);

  // Pageview on path change
  useEffect(() => {
    if (!pathname) return;
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (lastPath.current === fullPath) return;
    lastPath.current = fullPath;
    firedScrolls.current = new Set();
    track({ type: "pageview", path: fullPath });
  }, [pathname, searchParams]);

  // Scroll depth
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const t of SCROLL_THRESHOLDS) {
        if (pct >= t && !firedScrolls.current.has(t)) {
          firedScrolls.current.add(t);
          track({ type: "scroll", payload: { pct: t } });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click delegation on data-track elements
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const label = el.getAttribute("data-track") ?? "unknown";
      const meta: Record<string, unknown> = {};
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith("data-track-")) {
          meta[attr.name.slice("data-track-".length)] = attr.value;
        }
      }
      const isProduct = label.startsWith("product:") || label.startsWith("category:");
      track({
        type: isProduct ? "product_view" : "click",
        payload: { label, ...meta },
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
