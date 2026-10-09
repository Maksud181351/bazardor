import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatBn, unitLine } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card-surface group block p-4 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-semibold leading-snug">{product.nameBn}</h3>
          <p className="text-xs text-muted">{unitLine(product.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatBn(product.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
