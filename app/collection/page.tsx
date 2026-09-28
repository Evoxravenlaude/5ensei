import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Collection — 5ENSEI",
  description: "The full 5ENSEI fragrance collection.",
};

export default function CollectionPage() {
  const available = products.filter((p) => p.status === "available").length;
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-12 sm:pt-16 pb-8 flex items-end justify-between gap-6 flex-wrap border-b border-line">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">The collection</h1>
          <p className="font-mono text-[12px] text-ink/55 lowercase mt-2">{available} available, {products.length - available} in development…</p>
        </div>
        <p className="text-ink/65 text-sm max-w-[40ch]">We build slowly, one fragrance at a time. Soren opens the collection; the rest is in development at the atelier.</p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 py-16 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl max-w-[20ch]">Not sure where to start?</h2>
            <p className="text-ink/70 max-w-[50ch] mt-3">Book a fitting at the atelier. We build a shortlist around how you already dress, not the other way around.</p>
          </div>
          <Link href="/contact" className="bg-ink hover:bg-rust transition-colors text-paper text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4">Book a fitting</Link>
        </div>
      </section>
    </div>
  );
}
