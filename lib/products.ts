import rawProducts from "@/data/products.json";

export type ProductStatus = "available" | "coming-soon";

export interface ProductTabs {
  scent: string;
  bottle: string;
  delivery: string;
}

export interface Product {
  slug: string;
  name: string;
  status: ProductStatus;
  sizeLabel: string;
  price: number | null;
  currency: string;
  image: string; // path under /public, e.g. "/soren-bottle.png"
  description: string;
  tabs: ProductTabs;
}

// data/products.json is the single source of truth — both this site and the
// admin panel (via the GitHub API) read and write that same file. A push to
// GitHub triggers a fresh Vercel build, which re-reads this import.
export const products: Product[] = rawProducts as Product[];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getAvailable() {
  return products.filter((p) => p.status === "available");
}

export function getComingSoon() {
  return products.filter((p) => p.status !== "available");
}

export function getFeatured(): Product {
  return products.find((p) => p.status === "available") ?? products[0];
}

export function money(amount: number | null, currency = "\u20a6") {
  if (amount === null || amount === undefined) return "Coming soon";
  return `${currency}${amount.toLocaleString()}`;
}
