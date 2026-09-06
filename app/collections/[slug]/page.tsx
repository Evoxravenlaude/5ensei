import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductsBySense,
  SENSE_LABEL,
  SENSE_COPY,
  Sense,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const VALID: Sense[] = ["smell", "touch", "sound"];

export function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!VALID.includes(params.slug as Sense)) return notFound();
  const sense = params.slug as Sense;
  const items = getProductsBySense(sense);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
      <nav className="text-xs text-smoke mb-6">
        <Link href="/" className="hover:text-bone">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-bone/80">{SENSE_LABEL[sense]}</span>
      </nav>

      <div className="max-w-xl mb-12">
        <p className="text-xs uppercase tracking-widest2 text-copper-bright mb-3">
          {SENSE_LABEL[sense]}
        </p>
        <h1 className="font-display text-3xl text-bone leading-snug">
          {SENSE_COPY[sense]}
        </h1>
      </div>

      <div className="flex gap-2 mb-8">
        {VALID.map((s) => (
          <Link
            key={s}
            href={`/collections/${s}`}
            className={`px-4 py-2 text-xs uppercase tracking-widest2 border ${
              s === sense
                ? "border-copper text-bone bg-copper/10"
                : "border-line text-smoke hover:text-bone hover:border-smoke"
            } transition-colors`}
          >
            {SENSE_LABEL[s]}
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
