// TODO(Phase 3): ganti MOCK_PRODUCTS/MOCK_CATEGORIES dan fungsi di bawah ini
// dengan query Supabase ke tabel `products`/`categories`. Struktur field
// sengaja dibuat mendekati skema DB final di PRD section 10, supaya
// komponen yang memakainya (ProductCard, dll) tidak perlu diubah nanti.

export interface Category {
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  categorySlug: string;
  name: string;
  sku: string;
  price: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export const MOCK_CATEGORIES: Category[] = [
  { slug: "mobile-legends", name: "Mobile Legends" },
  { slug: "free-fire", name: "Free Fire" },
  { slug: "roblox", name: "Roblox" },
  { slug: "genshin-impact", name: "Genshin Impact" },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: "ml-86", categorySlug: "mobile-legends", name: "86 Diamonds", sku: "ML-86", price: 21000, isPopular: true },
  { id: "ml-172", categorySlug: "mobile-legends", name: "172 Diamonds", sku: "ML-172", price: 41000, isNew: true },
  { id: "ff-70", categorySlug: "free-fire", name: "70 Diamonds", sku: "FF-70", price: 10000, isPopular: true },
  { id: "ff-140", categorySlug: "free-fire", name: "140 Diamonds", sku: "FF-140", price: 20000 },
  { id: "rb-400", categorySlug: "roblox", name: "400 Robux", sku: "RB-400", price: 76000, isPopular: true },
  { id: "rb-800", categorySlug: "roblox", name: "800 Robux", sku: "RB-800", price: 150000, isNew: true },
  { id: "gi-60", categorySlug: "genshin-impact", name: "60 Genesis Crystal", sku: "GI-60", price: 16000 },
  { id: "gi-300", categorySlug: "genshin-impact", name: "300+30 Genesis Crystal", sku: "GI-300", price: 79000, isPopular: true },
];

export function getPopularProducts(limit = 4): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isPopular).slice(0, limit);
}

export function getNewProducts(limit = 4): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}
