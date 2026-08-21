import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/products/mock-data";

export function ProductHighlights({
  title,
  products,
  viewAllHref = "/products",
}: {
  title: string;
  products: Product[];
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold sm:text-2xl">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          Lihat semua →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-fade-up"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
