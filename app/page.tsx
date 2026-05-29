import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { company } from "@/data/company";
import { sortedCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-line bg-white">
        <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          {[
            `Established ${company.established}`,
            "MSME Registered",
            "ISO Certified",
            "Pan-India Delivery",
            "Govt · Municipal · Private",
            "In-house Manufacturing, PCMC",
          ].map((t) => (
            <span key={t} className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
              <span className="mr-2 text-amber">▪</span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="paper-grid">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <SectionHeading index="00" label="Who we are" title="Cleaner cities and villages, engineered to spec." />
          </div>
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">{company.intro}</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                From sewer cleaning and road sweeping to mobile sanitation and waste-collection vehicles, we
                provide reliable solutions — and back every machine with installation, training, and long-term
                service support.
              </p>
              <Link href="/about" className="btn-ghost mt-7">
                About S.S. Engineers
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-line bg-white">
        <div className="container-x py-16 md:py-24">
          <SectionHeading
            index="01"
            label="Product portfolio"
            title="Eight categories. One manufacturing partner."
            intro="Standard machines off our line, or units engineered to your tender specification."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="paper-grid border-t border-line">
          <div className="container-x py-16 md:py-24">
            <SectionHeading index="02" label="Selected equipment" title="Featured machines" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose + sectors */}
      <section className="border-t border-line bg-white">
        <div className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <SectionHeading index="03" label="Why S.S. Engineers" title="Built, delivered, and supported." />
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {company.whyChoose.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading index="04" label="Industries we serve" title="Public sector to private developments." />
            <div className="mt-8 flex flex-wrap gap-2">
              {company.sectors.map((s) => (
                <span key={s} className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
