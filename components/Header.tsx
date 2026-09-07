"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MegaMenu from "./MegaMenu";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 h-[64px] flex items-center justify-between gap-6">
        <button
          className="md:hidden text-ink"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <Link href="/" className="flex items-center">
          <Image src="/logo-wordmark.png" alt="5ENSEI" width={140} height={56} className="h-6 w-auto" priority />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-5">
          <button
            onClick={openCart}
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
            className="relative text-ink/80 hover:text-ink transition-colors"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M5 6h9l1 11.5H4L5 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-rust text-[10px] leading-4 text-center text-paper">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-paper px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink text-sm font-semibold uppercase tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/collection"
            className="text-ink text-sm font-semibold uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            Collection
          </Link>
        </div>
      )}
    </header>
  );
}
