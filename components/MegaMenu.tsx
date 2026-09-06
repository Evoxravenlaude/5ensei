"use client";

import Link from "next/link";
import { useState } from "react";
import { SENSE_LABEL, SENSE_COPY, products, Sense } from "@/lib/products";
import VesselArt from "./VesselArt";

const SENSES: Sense[] = ["smell", "touch", "sound"];

export default function MegaMenu() {
  const [open, setOpen] = useState<Sense | null>(null);
  const featured = products.find((p) => p.sense === (open ?? "smell") && p.featured) ??
    products.find((p) => p.sense === (open ?? "smell"));

  return (
    <nav
      className="relative hidden md:flex items-center gap-8"
      onMouseLeave={() => setOpen(null)}
    >
      {SENSES.map((sense) => (
        <div key={sense} onMouseEnter={() => setOpen(sense)}>
          <Link
            href={`/collections/${sense}`}
            className={`text-sm tracking-wide py-2 border-b transition-colors ${
              open === sense
                ? "border-copper text-bone"
                : "border-transparent text-bone/80 hover:text-bone"
            }`}
          >
            {SENSE_LABEL[sense]}
          </Link>
        </div>
      ))}
      <Link
        href="/about"
        className="text-sm tracking-wide py-2 text-bone/80 hover:text-bone border-b border-transparent"
      >
        About
      </Link>

      {open && (
        <div
          className="absolute left-1/2 top-full z-40 w-[720px] -translate-x-1/2 border border-line bg-ink shadow-2xl"
          onMouseEnter={() => setOpen(open)}
        >
          <div className="grid grid-cols-[1.3fr_1fr]">
            <div className="p-8">
              <p className="text-xs uppercase tracking-widest2 text-smoke mb-3">
                {SENSE_LABEL[open]}
              </p>
              <p className="font-display text-lg text-bone/90 leading-snug max-w-sm mb-6">
                {SENSE_COPY[open]}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {products
                  .filter((p) => p.sense === open)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-sm text-bone/80 hover:text-copper-bright transition-colors"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href={`/collections/${open}`}
                className="inline-block mt-6 text-xs uppercase tracking-widest2 text-copper-bright hover:text-bone transition-colors"
              >
                View all {SENSE_LABEL[open].toLowerCase()}
              </Link>
            </div>
            {featured && (
              <Link
                href={`/products/${featured.slug}`}
                className="border-l border-line p-8 flex flex-col items-center justify-center bg-ink-soft hover:bg-graphite/40 transition-colors"
              >
                <VesselArt
                  format={featured.format}
                  tint={featured.tint}
                  code={featured.code}
                  className="h-40 w-24 text-smoke"
                />
                <p className="mt-4 text-sm text-bone">{featured.name}</p>
                <p className="text-xs text-smoke">{featured.tagline}</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
