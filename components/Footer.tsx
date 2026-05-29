import Link from "next/link";
import { company, nav } from "@/data/company";
import { sortedCategories } from "@/data/categories";
import { telLink, mailLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="blueprint text-white">
      <div className="h-1.5 w-full safety-stripes" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center bg-brand font-display text-sm font-extrabold text-white">
              SS
            </span>
            <span className="font-display text-lg font-extrabold">{company.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {company.tagline}.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {company.contact.address.lines.join(", ")}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mono-label !text-white/45">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm text-white/75 hover:text-amber">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mono-label !text-white/45">Products</p>
          <ul className="mt-4 space-y-2.5">
            {sortedCategories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-sm text-white/75 hover:text-amber"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mono-label !text-white/45">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {company.contact.phonesRaw.map((p, i) => (
              <li key={p}>
                <a href={telLink(p)} className="hover:text-amber">
                  {company.contact.phones[i]}
                </a>
              </li>
            ))}
            <li>
              <a href={mailLink()} className="break-all hover:text-amber">
                {company.contact.email}
              </a>
            </li>
            <li className="pt-2 text-white/55">{company.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <span className="font-mono uppercase tracking-[0.18em]">
            {company.certifications.map((c) => c.name).join(" · ")}
          </span>
        </div>
      </div>
    </footer>
  );
}
