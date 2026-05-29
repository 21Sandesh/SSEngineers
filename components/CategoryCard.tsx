import Link from "next/link";
import { type Category } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export default function CategoryCard({ category }: { category: Category }) {
  const count = getProductsByCategory(category.slug).length;
  const num = String(category.order).padStart(2, "0");

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col justify-between border border-line bg-white p-6 transition-all duration-300 hover:border-ink hover:shadow-[8px_8px_0_0_theme(colors.ink)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[12px] tracking-[0.18em] text-amber">{num}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
          {count} {count === 1 ? "product" : "products"}
        </span>
      </div>
      <div className="mt-10">
        <p className="mono-label">{category.tagline}</p>
        <h3 className="display-tight mt-2 text-2xl text-ink">{category.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{category.description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-brand">
        View range
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </span>
    </Link>
  );
}
