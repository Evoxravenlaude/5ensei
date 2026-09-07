import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Collection — 5ENSEI",
  description: "The full 5ENSEI fragrance collection.",
};

export default function CollectionPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-16 pb-11">
        <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-rust mb-3">
          Full range
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl">The collection</h1>
        <p className="mt-4 text-ink/68 max-w-[52ch]">
          We build slowly, one fragrance at a time. Soren opens the collection now, with more in
          development at the atelier.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <p className="font-mono text-xs text-ink/55 mt-6">
          Soren is a 50ml extrait de parfum, available now. Further releases are in development at
          the atelier.
        </p>
      </div>

      <section className="bg-ink text-paper border-t border-b border-rust-deep py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="w-11 h-px bg-brass-soft mb-6" />
          <h2 className="font-display italic font-bold text-3xl sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="text-paper/78 max-w-[50ch] mt-4">
            Book a fitting at the atelier &mdash; we build a shortlist around how you already dress,
            not the other way around.
          </p>
          <a
            href="/contact"
            className="inline-block mt-7 border border-paper text-paper hover:bg-paper hover:text-ink transition-colors text-xs font-bold uppercase tracking-wide px-7 py-3.5"
          >
            Book a fitting
          </a>
        </div>
      </section>
    </div>
  );
}
