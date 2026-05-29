import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: Params }) {
  const category = getCategory(params.category);
  if (!category) notFound();
  const products = getProductsByCategory(category.slug);

  return (
    <>
      <section className="blueprint text-white">
        <div className="h-[3px] w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm font-medium text-white/50 hover:text-amber transition-colors -ml-2 mb-6"
          >
            ← All products
          </Link>
          <SectionHeading
            light
            index={String(category.order).padStart(2, "0")}
            label={category.tagline}
            title={category.name}
            intro={category.description}
          />
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          {products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.slug} delay={i * 50}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">Products in this category are coming soon.</p>
          )}
        </div>
      </section>

      <CTABand />
    </>
  );
}
