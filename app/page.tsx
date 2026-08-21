import { Hero } from "@/components/landing/Hero";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { ProductHighlights } from "@/components/landing/ProductHighlights";
import { PromoBanner } from "@/components/landing/PromoBanner";
import { ValueProps } from "@/components/landing/ValueProps";
import { FAQ } from "@/components/landing/FAQ";
import { getPopularProducts, getNewProducts } from "@/lib/products/mock-data";

export default function HomePage() {
  const popularProducts = getPopularProducts();
  const newProducts = getNewProducts();

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductHighlights title="Produk Populer" products={popularProducts} />
      <PromoBanner />
      <ProductHighlights title="Produk Terbaru" products={newProducts} />
      <ValueProps />
      <FAQ />
    </>
  );
}

