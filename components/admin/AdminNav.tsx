"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminNavLinks({ items, variant }: { items: Item[]; variant: "desktop" | "mobile" }) {
  const pathname = usePathname() ?? "";
  const base =
    variant === "desktop"
      ? "rounded px-3 py-1.5 text-sm font-medium transition-colors"
      : "whitespace-nowrap rounded px-3 py-1 text-xs font-medium transition-colors";
  return (
    <>
      {items.map((n) => {
        const active = isActive(pathname, n.href);
        const style = active
          ? "bg-ink text-white"
          : "text-ink-soft hover:bg-paper hover:text-ink";
        return (
          <Link key={n.href} href={n.href} className={`${base} ${style}`}>
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
