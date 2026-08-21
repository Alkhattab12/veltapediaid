import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/products/ProductCard";
import type { Category, Product } from "@/types/database";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return { title: params.slug.replace(/-/g, " ") };
}

export default async function CategoryProductsPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  const { data: categoryData } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  const category = categoryData as Category | null;

  if (!category) {
    notFound();
  }

  const { data: productsData, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("price", { ascending: true });

  const products = (productsData ?? []) as Product[];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <ChevronLeft className="h-4 w-4" />
        Semua Game
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
        {category.name}
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Pilih nominal top up di bawah ini.
      </p>

      {error ? (
        <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          Gagal memuat daftar produk. Coba refresh halaman.
        </p>
      ) : null}

      {!error && products.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">
          Belum ada produk untuk game ini.
        </p>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
