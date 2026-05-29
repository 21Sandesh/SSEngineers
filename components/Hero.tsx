import Link from "next/link";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative blueprint text-white">
      <div className="absolute inset-x-0 top-0 h-1.5 safety-stripes" />
      <div className="container-x relative py-20 md:py-28">
        <p
          className="mono-label !text-amber animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          Manufacturing · Pune · Since {company.established}
        </p>

        <h1
          className="display-tight mt-5 max-w-4xl text-4xl text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] animate-fade-up"
          style={{ animationDelay: "90ms" }}
        >
          {company.hero.title}
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          {company.hero.subtitle}
        </p>

        <div
          className="mt-9 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "270ms" }}
        >
          <Link href="/products" className="btn-amber">
            Explore products
          </Link>
          <Link href="/contact" className="btn-ghost-light">
            Request a quote
          </Link>
          <a
            href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light"
          >
            WhatsApp us
          </a>
        </div>

        <div
          className="mt-12 inline-flex items-center gap-3 border-t border-white/15 pt-5 animate-fade-up"
          style={{ animationDelay: "360ms" }}
        >
          <span className="font-display text-2xl font-extrabold text-amber">“</span>
          <p className="font-display text-lg font-bold tracking-tight text-white/90">
            {company.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
