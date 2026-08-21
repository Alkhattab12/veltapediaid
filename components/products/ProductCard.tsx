import { formatIDR } from "@/lib/utils/format";

interface ProductCardData {
  id: string;
  name: string;
  sku: string;
  price: number;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface transition-colors hover:border-primary/40">
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <span className="font-display text-3xl font-semibold text-text-primary/80">
          {product.name.charAt(0)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-mono text-xs text-text-muted">{product.sku}</p>
        <h3 className="text-sm font-medium text-text-primary">
          {product.name}
        </h3>
        <p className="mt-auto font-mono text-sm font-semibold text-secondary">
          {formatIDR(product.price)}
        </p>
      </div>
    </div>
  );
}
