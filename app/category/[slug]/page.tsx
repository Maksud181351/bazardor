import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { formatBn } from "@/lib/format";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category ? category.nameBn : "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <header className="card-surface flex items-center gap-4 p-5 sm:p-6">
        <span aria-hidden className="grid h-14 w-14 place-items-center rounded-2xl bg-base-200 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            {formatBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>
      <div className="mt-4">
        <SortableProducts products={products} />
      </div>
    </div>
  );
}
