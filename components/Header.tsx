"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { products, getFeatured } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import SearchOverlay from "./SearchOverlay";

type Column = { title: string; links: { label: string; href: string; soon?: boolean }[] };
type Item = { label: string; href: string; columns?: Column[] };

const featured = getFeatured();
const ITEMS: Item[] = [
  {
    label: "Collection",
    href: "/collection",
    columns: [
      {
        title: "the collection",
        links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, soon: p.status !== "available" })),
      },
      {
        title: "by format",
        links: [
          { label: "extrait de parfum, 50 ml", href: "/collection" },
          { label: "discovery size", href: "/contact", soon: true },
          { label: "personalised label", href: `/products/${featured.slug}#label` },
        ],
      },
      {
        title: "the house",
        links: [
          { label: "philosophy", href: "/philosophy" },
          { label: "the ilorin atelier", href: "/contact" },
          { label: "order on whatsapp", href: "https://wa.me/2348034900874" },
        ],
      },
    ],
  },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Atelier", href: "/contact" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("Collection");
  const closeTimer = useRef<number>();

  useEffect(() => { setOpen(null); setMobile(false); setSearch(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", mobile || search);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [mobile, search]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); setSearch(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const show = (label: string) => { window.clearTimeout(closeTimer.current); setOpen(label); };
  const hide = () => { closeTimer.current = window.setTimeout(() => setOpen(null), 140); };
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-line" onMouseLeave={hide}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 h-[64px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-5 md:hidden">
          <button onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile} className="text-ink">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>

        <Link href="/" className="flex items-center md:mr-6" aria-label="5ENSEI home">
          <Image src="/logo-wordmark.png" alt="5ENSEI" width={140} height={56} className="h-6 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-9 flex-1" aria-label="Primary">
          {ITEMS.map((it) => (
            <div key={it.label} onMouseEnter={() => (it.columns ? show(it.label) : setOpen(null))} onFocus={() => it.columns && show(it.label)}>
              <Link
                href={it.href}
                className={`nav-link text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/85 hover:text-ink ${active(it.href) ? "on" : ""}`}
                aria-expanded={it.columns ? open === it.label : undefined}
              >
                {it.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button onClick={() => setSearch(true)} aria-label="Search" className="text-ink/80 hover:text-ink transition-colors">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <button onClick={openCart} aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`} className="relative text-ink/80 hover:text-ink transition-colors flex items-center gap-2">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M5 6h9l1 11.5H4L5 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.5" /></svg>
            <span className="hidden sm:inline font-mono text-[11px] text-ink/70">({count})</span>
          </button>
        </div>
      </div>

      {/* full-width panel, Le Labo style: column lists on the left, the featured bottle on the right */}
      {ITEMS.filter((i) => i.columns).map((it) => (
        <div key={it.label} className={`mega hidden md:block ${open === it.label ? "open" : ""}`} onMouseEnter={() => show(it.label)} aria-hidden={open !== it.label}>
          <div className="mx-auto max-w-7xl px-5 sm:px-10 grid grid-cols-[repeat(3,minmax(0,1fr))_260px] gap-10 py-10">
            {it.columns!.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] text-ink/50 mb-4 lowercase">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink/85 hover:text-rust transition-colors" tabIndex={open === it.label ? 0 : -1}>
                        {l.label}
                        {l.soon && <span className="ml-2 font-mono text-[10px] normal-case tracking-normal text-ink/40">soon</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href={`/products/${featured.slug}`} className="group border border-line bg-paper-deep/60 hover:bg-paper-deep transition-colors p-6 flex flex-col items-center text-center" tabIndex={open === it.label ? 0 : -1}>
              <Image src={featured.image} alt={featured.name} width={289} height={739} className="h-36 w-auto drop-shadow-[0_12px_16px_rgba(23,19,16,0.22)] transition-transform group-hover:-translate-y-1" />
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em]">{featured.name}</p>
              <p className="font-mono text-[11px] text-ink/55 mt-1 lowercase">now available…</p>
            </Link>
          </div>
        </div>
      ))}

      {/* mobile drawer */}
      <div className={`md:hidden fixed inset-0 z-50 ${mobile ? "" : "pointer-events-none"}`} aria-hidden={!mobile}>
        <div className={`absolute inset-0 bg-ink/50 transition-opacity ${mobile ? "opacity-100" : "opacity-0"}`} onClick={() => setMobile(false)} />
        <aside className={`absolute left-0 top-0 h-full w-[88%] max-w-sm bg-paper flex flex-col transition-transform duration-500 ease-signature ${mobile ? "translate-x-0" : "-translate-x-full"}`} role="dialog" aria-label="Menu">
          <div className="h-[64px] flex items-center justify-between px-5 border-b border-line">
            <Image src="/logo-wordmark.png" alt="5ENSEI" width={140} height={56} className="h-5 w-auto" />
            <button onClick={() => setMobile(false)} aria-label="Close menu" className="text-ink/70"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" /></svg></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-2" aria-label="Menu">
            {ITEMS.map((it) => (
              <div key={it.label} className="border-b border-line">
                {it.columns ? (
                  <>
                    <button className="w-full flex items-center justify-between py-4 text-[13px] font-semibold uppercase tracking-[0.14em]" onClick={() => setMobileGroup(mobileGroup === it.label ? null : it.label)} aria-expanded={mobileGroup === it.label}>
                      {it.label}
                      <span className="font-mono text-ink/50">{mobileGroup === it.label ? "–" : "+"}</span>
                    </button>
                    {mobileGroup === it.label && (
                      <div className="pb-4 grid gap-5">
                        {it.columns.map((col) => (
                          <div key={col.title}>
                            <p className="font-mono text-[11px] text-ink/50 mb-2 lowercase">{col.title}</p>
                            <ul className="space-y-2">
                              {col.links.map((l) => (
                                <li key={l.label}><Link href={l.href} className="text-[13px] text-ink/85">{l.label}{l.soon && <span className="ml-2 font-mono text-[10px] text-ink/40">soon</span>}</Link></li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={it.href} className="block py-4 text-[13px] font-semibold uppercase tracking-[0.14em]">{it.label}</Link>
                )}
              </div>
            ))}
          </nav>
          <div className="px-5 py-5 border-t border-line font-mono text-[11px] text-ink/55 lowercase">presence before introduction…</div>
        </aside>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </header>
  );
}
