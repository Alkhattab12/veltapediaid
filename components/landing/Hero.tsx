import Link from "next/link";
import { MOCK_CATEGORIES } from "@/lib/products/mock-data";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
      <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-primary">
        Top Up Instan • Aman • Transparan
      </span>
      <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
        Top up game favoritmu,
        <br className="hidden sm:block" /> kelar dalam hitungan menit.
      </h1>
      <p className="max-w-xl text-text-muted">
        Mobile Legends, Free Fire, Roblox, Genshin Impact, dan game lainnya —
        bayar sekali, produk langsung diproses otomatis.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/products"
          className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Lihat Semua Produk
        </Link>
        <a
          href="#keunggulan"
          className="rounded-full border border-white/10 px-6 py-3 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
        >
          Kenapa Veltapedia?
        </a>
      </div>

      <div className="mt-4 flex w-full gap-3 overflow-x-auto pb-2 sm:justify-center">
        {MOCK_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="shrink-0 rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
