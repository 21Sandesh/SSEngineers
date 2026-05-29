import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import CTABand from "@/components/CTABand";
import { getCategory } from "@/data/categories";
import { products, getProduct, getProductsByCategory } from "@/data/products";
import { company } from "@/data/company";
import { waLink, telLink } from "@/lib/utils";

type Params = { category: string; product: string };

export function generateStaticParams() {
  return products.map((p) => ({ category: p.categorySlug, product: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = getProduct(params.category, params.product);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const category = getCategory(params.category);
  const product = getProduct(params.category, params.product);
  if (!category || !product) notFound();

  const related = getProductsByCategory(category.slug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const enquiry = `Hello S.S. Engineers, I'd like to enquire about the ${product.name}.`;

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-x py-8">
          <nav className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-steel">
            <Link href="/products" className="hover:text-brand">Products</Link>
            <span>/</span>
            <Link href={`/products/${category.slug}`} className="hover:text-brand">{category.name}</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x grid gap-10 py-12 md:grid-cols-2 md:py-16">
          <div>
            <ProductImage src={product.images[0]} alt={product.name} className="aspect-[4/3] w-full border border-line" />
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((img, i) => (
                  <ProductImage key={i} src={img} alt={`${product.name} ${i + 2}`} className="aspect-square w-full border border-line" />
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mono-label">{category.name}</p>
            <h1 className="display-tight mt-2 text-3xl text-ink sm:text-4xl">{product.name}</h1>
            {product.status === "coming-soon" && (
              <span className="mt-3 inline-block bg-amber px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                Coming soon
              </span>
            )}
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{product.longDescription}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={waLink(enquiry)} target="_blank" rel="noopener noreferrer" className="btn-amber">
                Enquire on WhatsApp
              </a>
              <a href={telLink(company.contact.phonesRaw[0])} className="btn-ghost">
                Call us
              </a>
              <Link href="/contact" className="btn-ghost">
                Request a quote
              </Link>
            </div>

            {product.features.length > 0 && (
              <div className="mt-9">
                <p className="mono-label">Features</p>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.applications.length > 0 && (
              <div className="mt-7">
                <p className="mono-label">Applications</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span key={a} className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="paper-grid border-t border-line">
        <div className="container-x py-14">
          <p className="mono-label">Specifications</p>
          {product.specs.length > 0 ? (
            <div className="mt-5 max-w-2xl border border-line bg-white">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex justify-between gap-6 px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-paper"}`}
                >
                  <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-steel">{s.label}</span>
                  <span className="text-right text-sm font-medium text-ink">{s.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-xl text-sm text-ink-soft">
              Detailed specifications for this model are available on request. Contact our team for the full
              technical sheet and pricing.
            </p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="container-x py-14">
            <p className="mono-label">More in {category.name}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
