"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/lib/products";

const NAV_LINKS = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const featured = products.find((p) => p.status === "available");

  return (
    <nav className="relative hidden md:flex items-center gap-8" onMouseLeave={() => setOpen(false)}>
      <div onMouseEnter={() => setOpen(true)}>
        <Link
          href="/collection"
          className={`text-sm font-semibold uppercase tracking-wide py-2 border-b-2 transition-colors ${
            open ? "border-ink text-ink" : "border-transparent text-ink/80 hover:text-ink"
          }`}
        >
          Collection
        </Link>
      </div>
      {NAV_LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-sm font-semibold uppercase tracking-wide py-2 text-ink/80 hover:text-ink border-b-2 border-transparent"
        >
          {l.label}
        </Link>
      ))}

      {open && (
        <div
          className="absolute left-1/2 top-full z-40 w-[560px] -translate-x-1/2 border border-line bg-paper shadow-2xl"
          onMouseEnter={() => setOpen(true)}
        >
          <div className="grid grid-cols-[1.2fr_1fr]">
            <div className="p-8">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-rust mb-4">
                The collection
              </p>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-sm text-ink/80 hover:text-rust transition-colors"
                    >
                      {p.name}
                      {p.status !== "available" && (
                        <span className="text-ink/40 text-xs ml-2">(coming soon)</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/collection"
                className="inline-block mt-6 text-[11px] font-mono font-bold uppercase tracking-widest2 text-rust hover:text-ink transition-colors"
              >
                View full collection
              </Link>
            </div>
            {featured && (
              <Link
                href={`/products/${featured.slug}`}
                className="border-l border-line p-8 flex flex-col items-center justify-center bg-paper-deep hover:bg-paper-deep/70 transition-colors"
              >
                <Image
                  src={featured.image}
                  alt={featured.name}
                  width={200}
                  height={260}
                  className="h-32 w-auto"
                />
                <p className="mt-4 text-sm text-ink font-semibold">{featured.name}</p>
                <p className="text-xs text-ink/50">{featured.sizeLabel}</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
