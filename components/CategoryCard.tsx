import Link from "next/link";
import { type Category } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export default function CategoryCard({ category }: { category: Category }) {
  const count = getProductsByCategory(category.slug).length;
  const num = String(category.order).padStart(2, "0");

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col justify-between bg-surface p-6 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-300"
      data-track={`category:${category.slug}`}
      data-track-name={category.name}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-[12px] tracking-[0.16em] text-amber">{num}</span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
          {count} {count === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Content */}
      <div className="mt-10">
        <p className="mono-label">{category.tagline}</p>
        <h3 className="display-tight mt-2 text-2xl text-ink">{category.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{category.description}</p>
      </div>

      {/* CTA */}
      <div className="mt-6 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          View range
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
        <span className="h-px w-8 bg-brand/25 transition-all duration-300 group-hover:w-14 group-hover:bg-brand/50" />
      </div>
    </Link>
  );
}
