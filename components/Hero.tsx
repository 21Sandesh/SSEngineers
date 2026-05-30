import Link from "next/link";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative blueprint text-white overflow-hidden">
      {/* Accent gradient stripe */}
      <div className="h-[3px] w-full safety-stripes" />

      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(15,122,60,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="container-x relative py-20 md:py-28 lg:py-32">
        {/* Tag line */}
        <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            Manufacturing · Pune · Since {company.established}
          </span>
        </div>

        <h1
          className="display-tight mt-6 max-w-4xl text-4xl text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          {company.hero.title}
        </h1>

        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          {company.hero.subtitle}
        </p>

        <div
          className="mt-8 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Link href="/products" className="btn-amber" data-track="cta:hero-explore-products">
            Explore products
          </Link>
          <Link href="/contact" className="btn-ghost-light" data-track="cta:hero-request-quote">
            Request a quote
          </Link>
          <a
            href={waLink("Hello S.S. Engineers, I'd like to enquire about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light"
            data-track="cta:hero-whatsapp"
          >
            WhatsApp us
          </a>
        </div>

        {/* Tagline strip */}
        <div
          className="mt-12 inline-flex items-center gap-3 border-t border-white/10 pt-5 animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <span className="font-display text-2xl font-extrabold text-amber">"</span>
          <p className="font-display text-base font-bold tracking-tight text-white/80 sm:text-lg">
            {company.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
