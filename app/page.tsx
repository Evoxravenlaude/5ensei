import Link from "next/link";
import Image from "next/image";
import { products, getFeatured } from "@/lib/products";
import ComingSoonGlyph from "@/components/VesselArt";
import Hero from "@/components/Hero";
import Label from "@/components/Label";
import ProductCard from "@/components/ProductCard";
import NotesFilm from "@/components/NotesFilm";

const featured = getFeatured();

export default function HomePage() {
  return (
    <>
      <Hero product={featured} />

      {/* Four editorial tiles: title, a lowercase line, "view more". The same rhythm Le Labo uses under its video. */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          <Tile href={`/products/${featured.slug}`} title={featured.name} line="now available…" cta="view more" bg="bg-paper-deep/60">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src={featured.image} alt="" width={289} height={739} className="h-[82%] w-auto drop-shadow-[0_18px_22px_rgba(23,19,16,0.2)] transition-transform duration-500 ease-signature group-hover:-translate-y-1.5" />
            </div>
          </Tile>
          <Tile href={`/products/${featured.slug}#label`} title="The label" line="typed for you, when the bottle is filled…" cta="personalise">
            <div className="absolute inset-0 flex items-center justify-center bg-paper p-6">
              <Label name="you" className="w-[64%] max-w-[190px] transition-transform duration-500 ease-signature group-hover:rotate-0" />
            </div>
          </Tile>
          <Tile href="/philosophy" title="Philosophy" line="one accord, not forty notes…" cta="read" dark bg="bg-ink">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-mono text-paper/85 text-[12px] sm:text-[15px] lowercase text-center max-w-[18ch] px-4 leading-relaxed">
                you will notice it before you notice who is wearing it.
              </p>
            </div>
          </Tile>
          <Tile href="/contact" title="The atelier" line="ilorin, by appointment…" cta="visit" dark bg="bg-rust">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/logo-mark.png" alt="" width={60} height={100} className="h-[46%] w-auto brightness-0 invert opacity-90" />
            </div>
          </Tile>
        </div>
      </section>

      {/* The scent, in three notes: each note is a chapter of the film */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-4 mb-10 flex-wrap">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em]">{featured.name}, in three notes</h2>
          <p className="font-mono text-[11px] text-ink/55 lowercase">{(featured.notes || []).join(", ")}…</p>
        </div>
        <NotesFilm notes={featured.notes} />
      </section>

      {/* The collection row */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-4 mb-8 flex-wrap">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em]">The collection</h2>
          <Link href="/collection" className="font-mono text-[11px] lowercase text-ink/60 hover:text-ink border-b border-transparent hover:border-ink transition-colors">view all…</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
          <div className="hidden lg:flex flex-col justify-end border border-line border-dashed p-6">
            <p className="font-mono text-[12px] text-ink/60 lowercase leading-relaxed">we build slowly, one fragrance at a time. if it earns a place, it stays.</p>
            <Link href="/philosophy" className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] border-b border-ink self-start pb-0.5">Why</Link>
          </div>
        </div>
      </section>

      {/* The label, explained. This is the one thing on the site nobody else has. */}
      <section className="border-t border-b border-line bg-paper-deep/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 py-16 sm:py-24 grid md:grid-cols-[1fr_1fr] gap-12 items-center">
          <div className="flex justify-center">
            <Label name="adaeze" note="worn since september" className="w-[min(72vw,320px)]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight max-w-[20ch]">Every bottle leaves with a typed label. Yours can carry a name.</h2>
            <p className="mt-5 text-ink/72 max-w-[46ch] leading-relaxed">
              When your Soren is filled at the atelier, a label is typed for it: who it is for, the date, the batch. Leave the name blank and it reads &ldquo;for: you&rdquo;. Add a line if there is something worth writing down.
            </p>
            <div className="mt-7 flex gap-4 flex-wrap">
              <Link href={`/products/${featured.slug}#label`} className="bg-ink hover:bg-rust transition-colors text-paper text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4">Personalise a label</Link>
              <Link href={`/products/${featured.slug}`} className="border border-ink text-ink text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4 hover:bg-ink hover:text-paper transition-colors">About Soren</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto, set like a lab note */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10 py-16 sm:py-24 grid md:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em]">Manifesto</h2>
        <div className="font-mono text-[15px] sm:text-[17px] leading-[1.75] lowercase text-ink/85 space-y-6 max-w-[58ch]">
          <p>every 5ensei fragrance is built around a single, unmistakable accord. not a list of forty notes competing for attention.</p>
          <p>we think of it the way an old family thinks of a signature: understated, consistent, recognisable only to those who already know what they are looking for.</p>
          <p>nothing is ever discontinued. we don&rsquo;t advertise. we are found.</p>
          <p className="text-ink/50">— the atelier, ilorin</p>
        </div>
      </section>

      {/* Visit */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 py-16 sm:py-20 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <p className="font-mono text-[11px] text-brass-soft lowercase mb-3">the ilorin atelier…</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight max-w-[22ch]">The only shopfront is the atelier, and it carries no sign.</h2>
            <p className="mt-4 text-paper/70 max-w-[48ch]">Visits are by appointment. Tell us what you are looking for and we will arrange a time, or send your order on WhatsApp and we confirm delivery with you directly.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/contact" className="border border-paper text-paper hover:bg-paper hover:text-ink transition-colors text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4">Book a visit</Link>
            <a href="https://wa.me/2348034900874" className="bg-paper text-ink hover:bg-brass-soft transition-colors text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({ href, title, line, cta, dark, bg = "bg-paper", children }: { href: string; title: string; line: string; cta: string; dark?: boolean; bg?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`group relative block aspect-[4/5] overflow-hidden ${bg}`}>
      {/* content sits above the caption band so the two never overlap on narrow tiles */}
      <div className="absolute inset-x-0 top-0 bottom-[36%] sm:bottom-[30%]">{children}</div>
      <div className={`absolute left-0 right-0 bottom-0 p-4 sm:p-5 ${dark ? "text-paper" : "text-ink"}`}>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em]">{title}</h3>
        <p className={`font-mono text-[11.5px] lowercase mt-1 ${dark ? "text-paper/70" : "text-ink/60"}`}>{line}</p>
        <span className={`inline-block mt-2 font-mono text-[11px] lowercase border-b pb-0.5 ${dark ? "border-paper/50" : "border-ink/40"} group-hover:border-current transition-colors`}>{cta}</span>
      </div>
    </Link>
  );
}
