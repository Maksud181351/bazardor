import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, topFallers, topRisers } from "@/lib/api";
import { formatBn } from "@/lib/format";
import { HomeSkeleton } from "@/components/Skeletons";

export const dynamic = 'force-dynamic';

async function HomeSections() {
  const products = await getProducts();
  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <>
      <section className="mt-10" aria-labelledby="risers">
        <h2 id="risers" className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-up" aria-hidden>▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      <section className="mt-10" aria-labelledby="fallers">
        <h2 id="fallers" className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-down" aria-hidden>▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="mt-12 scroll-mt-4" aria-labelledby="all">
        <h2 id="all" className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-muted">
          মোট {formatBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}
