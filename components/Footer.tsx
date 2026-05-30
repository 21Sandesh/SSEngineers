import Link from "next/link";
import { company, nav } from "@/data/company";
import { sortedCategories } from "@/data/categories";
import { telLink, mailLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="blueprint text-white">
      {/* Accent stripe */}
      <div className="h-[3px] w-full safety-stripes" />

      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-gradient-to-br from-brand to-brand-deep font-display text-sm font-extrabold text-white shadow-sm">
              SS
            </span>
            <span className="font-display text-[15px] font-extrabold">{company.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            {company.tagline}.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/40">
            {company.contact.address.lines.join(", ")}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {company.certifications.map((c) => (
              <span
                key={c.name}
                className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="md:col-span-3">
          <p className="mono-label !text-white/35">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-sm text-white/60 hover:text-amber transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="md:col-span-2">
          <p className="mono-label !text-white/35">Products</p>
          <ul className="mt-4 space-y-2.5">
            {sortedCategories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-sm text-white/60 hover:text-amber transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <p className="mono-label !text-white/35">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {company.contact.phonesRaw.map((p, i) => (
              <li key={p}>
                <a
                  href={telLink(p)}
                  className="hover:text-amber transition-colors"
                  data-track="contact:footer-phone"
                  data-track-phone={p}
                >
                  {company.contact.phones[i]}
                </a>
              </li>
            ))}
            <li>
              <a
                href={mailLink()}
                className="break-all hover:text-amber transition-colors"
                data-track="contact:footer-email"
              >
                {company.contact.email}
              </a>
            </li>
            <li className="pt-2 text-white/35">{company.contact.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/35 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-amber transition-colors">
              Privacy
            </Link>
            <span className="font-mono uppercase tracking-[0.16em]">
              MSME · ISO · Pan-India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
