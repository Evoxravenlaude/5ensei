"use client";

import Link from "next/link";
import { useState } from "react";
import MegaMenu from "./MegaMenu";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <button
          className="md:hidden text-bone"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <Link href="/" className="font-sans font-semibold tracking-[0.24em] text-bone text-lg">
          5ENSEI
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="hidden sm:block text-bone/80 hover:text-bone transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <Link
            href="/about"
            aria-label="Account"
            className="hidden sm:block text-bone/80 hover:text-bone transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2.5 16c1.2-3.6 4-5 6.5-5s5.3 1.4 6.5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative text-bone/80 hover:text-bone transition-colors"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path
                d="M5 6h9l1 11.5H4L5 6z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M7 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-copper text-[10px] leading-4 text-center text-bone">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-ink px-5 py-4 flex flex-col gap-3">
          {["smell", "touch", "sound"].map((s) => (
            <Link
              key={s}
              href={`/collections/${s}`}
              className="text-bone/90 text-sm capitalize"
              onClick={() => setMobileOpen(false)}
            >
              {s}
            </Link>
          ))}
          <Link href="/about" className="text-bone/90 text-sm" onClick={() => setMobileOpen(false)}>
            About
          </Link>
        </div>
      )}
    </header>
  );
}
