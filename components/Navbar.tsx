"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, company } from "@/data/company";
import { waLink } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center bg-brand font-display text-sm font-extrabold text-white">
            SS
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            {company.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <a href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")} className="btn-amber" target="_blank" rel="noopener noreferrer">
            Enquire
          </a>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper md:hidden">
          <div className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")}
              className="btn-amber mt-3 w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
