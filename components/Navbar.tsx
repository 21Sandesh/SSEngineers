"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { nav, company } from "@/data/company";
import { waLink } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-nav"
          : "bg-white/80 backdrop-blur-md border-b border-line"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-gradient-to-br from-brand to-brand-deep font-display text-sm font-extrabold text-white shadow-sm">
            SS
          </span>
          <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">
            {company.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              data-track={`nav:${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3">
            <a
              href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")}
              className="btn-amber"
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta:nav-enquire"
            >
              Enquire
            </a>
          </div>
        </nav>

        {/* Hamburger */}
        <button
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded hover:bg-paper md:hidden transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-[1.5px] w-5 rounded-full bg-ink transition-transform duration-200 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full bg-ink transition-transform duration-200 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-white/95 backdrop-blur-xl shadow-card-md md:hidden">
          <div className="container-x flex flex-col gap-0.5 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper hover:text-ink transition-colors"
                data-track={`nav-mobile:${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 pb-2">
              <a
                href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")}
                className="btn-amber w-full"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                data-track="cta:nav-mobile-whatsapp"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
