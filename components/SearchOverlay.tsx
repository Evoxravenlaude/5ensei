"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, money } from "@/lib/products";
import ComingSoonGlyph from "./VesselArt";

const PAGES = [
  { label: "The collection", href: "/collection", text: "every fragrance, available and in development" },
  { label: "Philosophy", href: "/philosophy", text: "presence before introduction, one accord, nothing discontinued" },
  { label: "The Ilorin atelier", href: "/contact", text: "visits by appointment, orders on whatsapp" },
  { label: "Personalised label", href: "/products/soren#label", text: "typed for you when the bottle is filled" },
];
const POPULAR = ["Soren", "extrait de parfum", "label", "atelier"];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setQ(""); window.setTimeout(() => ref.current?.focus(), 60); } }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return { products: [], pages: [] };
    return {
      products: products.filter((p) => [p.name, p.sizeLabel, p.description, p.tabs.scent].join(" ").toLowerCase().includes(s)),
      pages: PAGES.filter((p) => (p.label + " " + p.text).toLowerCase().includes(s)),
    };
  }, [q]);
  const empty = q.trim() && !results.products.length && !results.pages.length;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className={`absolute left-0 right-0 top-0 bg-paper border-b border-line transition-transform duration-500 ease-signature ${open ? "translate-y-0" : "-translate-y-full"}`} role="dialog" aria-label="Search">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 py-6 sm:py-8">
          <div className="flex items-center gap-4 border-b border-ink pb-3">
            <input
              ref={ref}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search the house…"
              aria-label="Search"
              className="flex-1 bg-transparent font-mono text-lg sm:text-2xl lowercase placeholder:text-ink/35 focus:outline-none"
            />
            <button onClick={onClose} aria-label="Close search" className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink/60 hover:text-ink">close</button>
          </div>

          {!q.trim() ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-mono text-[0.6875rem] text-ink/50 lowercase">popular:</span>
              {POPULAR.map((p) => (
                <button key={p} onClick={() => setQ(p)} className="font-mono text-[0.8125rem] lowercase border-b border-transparent hover:border-ink">{p}</button>
              ))}
            </div>
          ) : empty ? (
            <p className="mt-6 font-mono text-sm text-ink/60 lowercase">nothing for &ldquo;{q}&rdquo;. try &ldquo;soren&rdquo;, or ask us on <a className="underline underline-offset-4" href="https://wa.me/2348034900874">whatsapp</a>.</p>
          ) : (
            <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr]">
              {results.products.length > 0 && (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {results.products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className="group block border border-line hover:border-ink/40 transition-colors p-4">
                        <div className="h-28 flex items-center justify-center">
                          {p.status === "available" ? <Image src={p.image} alt={p.name} width={289} height={739} className="h-full w-auto" /> : <ComingSoonGlyph className="h-12 w-auto text-rust opacity-40" />}
                        </div>
                        <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em]">{p.name}</p>
                        <p className="font-mono text-[0.6875rem] text-ink/55 lowercase">{p.status === "available" ? money(p.price, p.currency) : "in development…"}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {results.pages.length > 0 && (
                <ul className="divide-y divide-line border-t border-line">
                  {results.pages.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="block py-3 hover:pl-1 transition-all">
                        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em]">{p.label}</span>
                        <span className="block font-mono text-[0.6875rem] text-ink/55 lowercase">{p.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
