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
        <div className="h-1.5 w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <Link href="/products" className="mono-label !text-white/55 hover:!text-amber">
            ← All products
          </Link>
          <div className="mt-6">
            <SectionHeading
              light
              index={String(category.order).padStart(2, "0")}
              label={category.tagline}
              title={category.name}
              intro={category.description}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-x py-16 md:py-24">
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
