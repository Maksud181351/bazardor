"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatBn } from "@/lib/format";
import ProductGrid from "./ProductGrid";

type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  // Prices are compared as numbers (never as Bengali strings), so
  // "৯২" < "১২৫" sorts correctly even though "৯" > "১" as text.
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const copy = [...products];
    copy.sort((a, b) => (sort === "asc" ? a.today - b.today : b.today - a.today));
    return copy;
  }, [products, sort]);

  return (
    <>
      <div className="card-surface flex items-center justify-end gap-3 p-3 sm:p-4">
        <label htmlFor="sort" className="text-sm text-muted">সাজান</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-sm sm:select-md w-52 max-w-full"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <p className="mb-3 mt-4 text-sm text-muted" aria-live="polite">
        মোট {formatBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sorted.length === 0 ? (
        <div className="card-surface px-6 py-14 text-center">
          <p className="text-lg font-semibold">এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই</p>
          <Link href="/" className="btn btn-primary mt-5">হোম পেজে ফিরে যান</Link>
        </div>
      ) : (
        <ProductGrid products={sorted} />
      )}
    </>
  );
}
