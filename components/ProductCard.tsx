import Link from "next/link";
import { type Product } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="group flex flex-col bg-surface shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      data-track={`product:${product.slug}`}
      data-track-category={product.categorySlug}
      data-track-name={product.name}
    >
      <ProductImage
        src={product.images[0]}
        alt={product.name}
        index={index}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col p-5">
        {product.status === "coming-soon" && (
          <div className="mb-2">
            <span className="rounded-full bg-amber-tint border border-amber/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-deep">
              Coming soon
            </span>
          </div>
        )}
        <h3 className="display-tight text-lg text-ink">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          View details
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
