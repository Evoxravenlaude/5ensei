import Link from "next/link";
import Image from "next/image";
import { products, getFeatured, money } from "@/lib/products";
import ComingSoonGlyph from "@/components/VesselArt";
import HomeInteractive from "@/components/HomeInteractive";

const featured = getFeatured();
const comingSoon = products.filter((p) => p.status !== "available");

export default function HomePage() {
  return (
    <>
      {/* Hero — dark, matches Le Labo's real pattern: one dark hero on an
          otherwise light-chrome site */}
      <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-ink">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 30% 15%, rgba(166,66,31,0.32), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(183,146,74,0.14), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10 grid md:grid-cols-[0.95fr_1.05fr] gap-10 items-center w-full py-16 md:py-0">
          <div className="flex items-center justify-center animate-rise-in">
            <Image
              src={featured.image}
              alt={`5ENSEI ${featured.name}, ${featured.sizeLabel}`}
              width={340}
              height={420}
              className="w-full max-w-[340px] h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
              priority
            />
          </div>
          <div className="text-paper text-center md:text-left animate-rise-in [animation-delay:.15s]">
            <Image
              src="/logo-mark.png"
              alt=""
              width={60}
              height={100}
              className="h-9 w-auto mb-5 mx-auto md:mx-0 animate-floaty"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(90%) sepia(12%) saturate(500%) hue-rotate(340deg) brightness(101%)",
              }}
            />
            <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-brass-soft mb-3">
              A Nigerian fragrance house
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[13ch] mx-auto md:mx-0">
              Presence before <em className="italic text-brass-soft">introduction</em>.
            </h1>
            <p className="mt-5 text-paper/75 max-w-[42ch] mx-auto md:mx-0">
              5ensei is built for people who no longer need to be loud to be remembered. Presence,
              built one scent at a time.
            </p>
            <div className="mt-7 flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <Link
                href="/collection"
                className="border border-paper/45 text-paper hover:bg-paper hover:text-ink transition-colors text-xs font-bold uppercase tracking-wide px-7 py-3.5"
              >
                Discover Soren
              </Link>
              <Link
                href="/philosophy"
                className="border border-paper/45 text-paper hover:bg-paper hover:text-ink transition-colors text-xs font-bold uppercase tracking-wide px-7 py-3.5"
              >
                Our philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial tile row */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
          <Link href="/collection" className="group relative aspect-[3/4] overflow-hidden bg-paper-deep">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, #FBF8F1 0%, #F0E7D4 72%)",
              }}
            >
              <Image
                src={featured.image}
                alt=""
                width={160}
                height={200}
                className="w-[48%] h-auto drop-shadow-[0_18px_22px_rgba(23,19,16,0.2)] transition-transform group-hover:-translate-y-1 group-hover:scale-[1.03]"
              />
            </div>
            <TileCaption eyebrow="Now available" title="Soren" link="Shop now" />
          </Link>

          <Link href="/philosophy" className="group relative aspect-[3/4] overflow-hidden bg-paper-deep">
            <Image
              src="/atmosphere.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-[center_35%] transition-transform group-hover:scale-105"
            />
            <TileCaption eyebrow="Our philosophy" title="Presence before introduction" link="Read more" />
          </Link>

          <Link href="/contact" className="group relative aspect-[3/4] overflow-hidden bg-ink">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo-mark.png"
                alt=""
                width={60}
                height={100}
                className="h-[30%] w-auto opacity-90 transition-transform group-hover:scale-105"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(90%) sepia(12%) saturate(500%) hue-rotate(340deg) brightness(101%)",
                }}
              />
            </div>
            <TileCaption eyebrow="Visit us" title="The Ilorin atelier" link="Get in touch" />
          </Link>

          <Link href="/collection" className="group relative aspect-[3/4] overflow-hidden bg-paper-deep">
            <div className="absolute inset-0 flex items-center justify-center">
              <ComingSoonGlyph className="w-[26%] h-auto text-rust opacity-50" />
            </div>
            <TileCaption eyebrow="In development" title="What's next" link="Get notified" />
          </Link>
        </div>
      </section>

      {/* Featured product deep-dive */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 py-20">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6 mb-12 flex-wrap">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">The collection, in brief</h2>
          <p className="text-ink/60 text-sm max-w-[34ch]">
            Soren opens the collection. More is in development at the atelier.
          </p>
        </div>
        <HomeInteractive product={featured} />
      </section>

      {/* Quick shop */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 pb-20">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6 mb-12 flex-wrap">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Quick shop</h2>
          <p className="text-ink/60 text-sm max-w-[34ch]">Everything currently open for order or notice.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7">
          <QuickShopCard slug={featured.slug} />
          {comingSoon.map((p) => (
            <QuickShopCard key={p.slug} slug={p.slug} />
          ))}
        </div>
      </section>

      {/* Atmosphere quote band */}
      <section
        className="relative min-h-[440px] flex items-center bg-cover bg-[center_25%] overflow-hidden"
        style={{ backgroundImage: "url('/atmosphere.jpg')" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(21,17,13,0.88) 0%, rgba(21,17,13,0.6) 46%, rgba(21,17,13,0.25) 100%)",
          }}
        />
        <div className="relative max-w-xl px-5 sm:px-10 text-paper">
          <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-brass-soft">
            Meet Soren
          </p>
          <blockquote className="mt-4 font-display italic text-2xl sm:text-3xl leading-snug">
            &ldquo;A delicate fusion of creamy warmth and toasted sweetness &mdash; unfolding with
            effortless elegance, leaving a trail that lingers long after you&rsquo;ve left.&rdquo;
          </blockquote>
          <Link
            href="/contact"
            className="inline-block mt-7 border border-paper text-paper hover:bg-paper hover:text-ink transition-colors text-xs font-bold uppercase tracking-wide px-7 py-3.5"
          >
            Enquire about Soren
          </Link>
        </div>
      </section>

      {/* Statement band */}
      <section className="bg-ink text-paper border-t border-b border-rust-deep py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <div className="w-11 h-px bg-brass-soft mb-6" />
            <h2 className="font-display italic font-bold text-3xl sm:text-4xl leading-tight max-w-[20ch]">
              You will notice it before you notice who is wearing it.
            </h2>
          </div>
          <div>
            <p className="text-paper/78 mb-4">
              Every 5ENSEI fragrance is built around a single, unmistakable accord &mdash; not a list
              of forty notes competing for attention. We think of it the way an old family thinks of
              a signature: understated, consistent, recognisable only to those who already know what
              they&rsquo;re looking for.
            </p>
            <p className="text-paper/78">No campaigns. No influencer drops. Just the bottle, and the room it enters.</p>
            <Link
              href="/philosophy"
              className="inline-block mt-7 border border-paper text-paper hover:bg-paper hover:text-ink transition-colors text-xs font-bold uppercase tracking-wide px-7 py-3.5"
            >
              Read our philosophy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TileCaption({ eyebrow, title, link }: { eyebrow: string; title: string; link: string }) {
  return (
    <div
      className="absolute left-0 right-0 bottom-0 p-5 text-paper"
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(23,19,16,0.85) 80%)" }}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-brass-soft">{eyebrow}</span>
      <h3 className="font-display font-bold text-[19px] mt-1 mb-2">{title}</h3>
      <span className="font-mono text-[11px] uppercase tracking-wide text-paper/90">{link} &rarr;</span>
    </div>
  );
}

function QuickShopCard({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug)!;
  const available = product.status === "available";
  return (
    <div className="flex flex-col">
      <div className="aspect-square bg-paper-deep border border-line flex items-center justify-center mb-4 overflow-hidden">
        {available ? (
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-[56%] h-auto drop-shadow-[0_14px_16px_rgba(23,19,16,0.16)]"
          />
        ) : (
          <ComingSoonGlyph className="w-11 h-auto text-rust opacity-35" />
        )}
      </div>
      <div className="text-[15px] font-bold uppercase tracking-wide">{product.name}</div>
      <div className="font-mono text-xs text-ink/55 mt-1">
        {available ? `${product.sizeLabel} \u00b7 ${money(product.price, product.currency)}` : product.sizeLabel}
      </div>
      <div className="mt-3.5 flex flex-col gap-2">
        {available ? (
          <>
            <a
              href="https://wa.me/2348034900874"
              className="bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-4 py-3 text-center"
            >
              Add to cart
            </a>
            <Link
              href={`/products/${product.slug}`}
              className="border border-ink text-ink text-xs font-bold uppercase tracking-wide px-4 py-3 text-center hover:bg-ink hover:text-paper transition-colors"
            >
              View details
            </Link>
          </>
        ) : (
          <Link
            href="/contact"
            className="border border-ink text-ink text-xs font-bold uppercase tracking-wide px-4 py-3 text-center hover:bg-ink hover:text-paper transition-colors"
          >
            Notify me
          </Link>
        )}
      </div>
    </div>
  );
}
