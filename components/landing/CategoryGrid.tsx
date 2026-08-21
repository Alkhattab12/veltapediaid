import Link from "next/link";
import { MOCK_CATEGORIES } from "@/lib/products/mock-data";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">
        Kategori Produk
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MOCK_CATEGORIES.map((category, index) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            style={{ animationDelay: `${index * 60}ms` }}
            className="group flex animate-fade-up flex-col items-center gap-3 rounded-2xl border border-white/5 bg-surface p-6 text-center transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 font-display text-lg font-semibold">
              {category.name.charAt(0)}
            </span>
            <span className="text-sm text-text-primary">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
