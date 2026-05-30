import Link from "next/link";
import type { Metadata } from "next";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { AdminNavLinks } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin · S.S. Engineers",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/funnel", label: "Funnel" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-surface">
        <div className="container-x flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded bg-gradient-to-br from-brand to-brand-deep font-display text-[11px] font-extrabold text-white">
                SS
              </span>
              <span className="font-display text-sm font-extrabold text-ink">Admin</span>
            </Link>
            <nav className="hidden gap-1 md:flex">
              <AdminNavLinks items={navItems} variant="desktop" />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-ink-muted hover:text-ink">
              View site →
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        <nav className="container-x flex gap-1 overflow-x-auto pb-2 pt-1 md:hidden">
          <AdminNavLinks items={navItems} variant="mobile" />
        </nav>
      </header>
      <main className="container-x py-8">{children}</main>
    </div>
  );
}
