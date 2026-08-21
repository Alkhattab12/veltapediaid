import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database";

export const metadata = {
  title: "Semua Produk",
};

const TILE_STYLES = [
  "from-primary/30 to-secondary/15",
  "from-secondary/30 to-primary/15",
  "from-primary/20 via-surface to-secondary/25",
  "from-secondary/20 via-surface to-primary/25",
];

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const categories = (data ?? []) as Category[];

  if (error) {
    console.error("Gagal fetch categories dari Supabase:", error);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">
        Pilih Game
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Pilih game untuk lihat daftar produk top up.
      </p>

      {error ? (
        <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          Gagal memuat daftar game. Coba refresh halaman.
        </p>
      ) : null}

      {!error && categories.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">
          Belum ada game yang tersedia.
        </p>
      ) : null}

      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
        {categories.map((category: Category, index: number) => (
          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-white/5 bg-surface transition-colors hover:border-primary/40"
          >
            <div
              className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${
                TILE_STYLES[index % TILE_STYLES.length]
              }`}
            >
              <Gamepad2
                className="h-9 w-9 text-text-primary/70 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
            </div>

            <span className="-mt-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface bg-bg font-display text-xs font-semibold text-primary">
              {category.name.charAt(0)}
            </span>

            <p className="px-2 pb-3 pt-1 text-center text-xs font-medium text-text-primary sm:text-sm">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
