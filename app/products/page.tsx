import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { sortedCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full S.S. Engineers product range — sewer & drain cleaning, road cleaning, garbage collection, mobile sanitation, waste infrastructure, incineration, processing, and special-purpose vehicles.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="blueprint text-white">
        <div className="h-1.5 w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <SectionHeading
            light
            index="01"
            label="Product portfolio"
            title="Equipment for every cleaning and sanitation need."
            intro="Eight focused categories, plus fully custom engineered solutions built to your tender specification."
          />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-x py-16 md:py-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 50}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 border border-dashed border-line bg-paper p-8 text-center">
            <p className="mono-label">Custom engineered solutions</p>
            <h3 className="display-tight mx-auto mt-2 max-w-xl text-2xl text-ink">
              Every project has unique requirements. We design, modify, and manufacture to spec.
            </h3>
            <a href="/contact" className="btn-primary mt-6">
              Discuss a custom build
            </a>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
