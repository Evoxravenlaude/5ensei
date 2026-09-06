import Link from "next/link";
import { getFeatured, products, SENSE_LABEL, SENSE_COPY, Sense } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import VesselArt from "@/components/VesselArt";

const hero = products.find((p) => p.slug === "agar-21")!;
const featured = getFeatured();
const senses: Sense[] = ["smell", "touch", "sound"];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-0 py-14 md:py-0">
          <div className="flex flex-col justify-center md:pr-12 md:min-h-[560px] animate-rise-in">
            <p className="text-xs uppercase tracking-widest2 text-smoke mb-5">
              A studio for the five senses
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] text-bone max-w-md">
              Every formula starts with one material, pushed until it stops being polite.
            </h1>
            <p className="mt-6 text-bone/70 max-w-sm leading-relaxed">
              5ensei blends fine fragrance, body care and home pours to order —
              organized not by gender or occasion, but by which sense carries them.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href={`/products/${hero.slug}`}
                className="bg-copper hover:bg-copper-bright transition-colors text-bone text-sm px-6 py-3"
              >
                Discover {hero.name}
              </Link>
              <Link
                href="/collections/smell"
                className="text-sm text-bone/80 hover:text-bone border-b border-line hover:border-bone transition-colors pb-0.5"
              >
                Shop fragrance
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center py-10 md:py-0 md:border-l md:border-line">
            <VesselArt
              format={hero.format}
              tint={hero.tint}
              code={hero.code}
              className="h-72 sm:h-[420px] w-auto text-smoke"
            />
          </div>
        </div>
      </section>

      {/* Five senses intro */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-10">
          {senses.map((sense) => (
            <Link key={sense} href={`/collections/${sense}`} className="group">
              <p className="text-xs uppercase tracking-widest2 text-copper-bright mb-2">
                {SENSE_LABEL[sense]}
              </p>
              <p className="font-display text-lg text-bone/90 leading-snug group-hover:text-bone transition-colors">
                {SENSE_COPY[sense]}
              </p>
              <span className="inline-block mt-4 text-xs text-smoke group-hover:text-bone transition-colors">
                Explore {SENSE_LABEL[sense].toLowerCase()}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl text-bone">Currently in the lab</h2>
            <Link href="/collections/smell" className="text-xs uppercase tracking-widest2 text-smoke hover:text-bone transition-colors">
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} size={i === 0 ? "large" : "regular"} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto teaser */}
      <section>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">The practice</p>
            <p className="font-display text-2xl sm:text-3xl text-bone leading-snug">
              We don't call ourselves perfumers. A sensei trains a sense until it
              notices what it used to skip past.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-sm text-bone/80 hover:text-bone border-b border-line hover:border-bone pb-0.5 transition-colors"
            >
              Read the practice
            </Link>
          </div>
          <ul className="space-y-5 text-bone/70 text-sm leading-relaxed border-l border-line pl-6">
            <li>Every formula is mixed and labeled at the moment you order it.</li>
            <li>Bottles and jars are made to be returned, refilled, and reused.</li>
            <li>Nothing in the library is designed for a gender — only for a material.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
