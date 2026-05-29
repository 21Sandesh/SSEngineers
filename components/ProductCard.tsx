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
      className="group flex flex-col border border-line bg-white transition-all duration-300 hover:border-ink hover:shadow-[8px_8px_0_0_theme(colors.ink)]"
    >
      <ProductImage
        src={product.images[0]}
        alt={product.name}
        index={index}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          {product.status === "coming-soon" && (
            <span className="bg-amber px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
              Coming soon
            </span>
          )}
        </div>
        <h3 className="display-tight mt-1 text-lg text-ink">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          Details
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
