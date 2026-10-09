import type { Category, Product } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://api.api-store.workers.dev/api/bazardor";

const REVALIDATE = 300; // seconds

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const FALLBACK_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export async function getCategories(): Promise<Category[]> {
  try {
    return await getJson<Category[]>("/categories");
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function getProducts(): Promise<Product[]> {
  return getJson<Product[]>("/products");
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const list = await getJson<Product[]>(`/products?slug=${encodeURIComponent(slug)}`);
  // The API filters by slug, but guard anyway.
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === slug);
}

export function topRisers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}

export function topFallers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);
}
