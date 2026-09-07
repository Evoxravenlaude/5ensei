"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { getProduct, money } from "@/lib/products";
import ComingSoonGlyph from "./VesselArt";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) setCheckingOut(false);
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={closeCart} aria-hidden="true" />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className="absolute right-0 top-0 h-full w-full max-w-md bg-paper border-l border-line flex flex-col animate-drawer-in"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest2 text-ink">
            Your bag {lines.length > 0 && `(${lines.reduce((n, l) => n + l.qty, 0)})`}
          </h2>
          <button onClick={closeCart} aria-label="Close bag" className="text-ink/70 hover:text-ink">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
            <p className="text-ink/90 font-display font-bold italic text-lg">Your bag is empty.</p>
            <p className="text-ink/50 text-sm">
              Soren is filled and finished by hand at our Ilorin atelier — nothing sits pre-made on a shelf.
            </p>
            <Link
              href="/collection"
              onClick={closeCart}
              className="mt-3 text-[11px] font-mono font-bold uppercase tracking-widest2 text-rust hover:text-ink transition-colors"
            >
              View the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-line px-6">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={line.slug} className="py-5 flex gap-4">
                    <div className="h-20 w-14 shrink-0 flex items-center justify-center bg-paper-deep">
                      {product.status === "available" ? (
                        <Image src={product.image} alt={product.name} width={56} height={80} className="h-full w-auto object-contain" />
                      ) : (
                        <ComingSoonGlyph className="h-10 w-auto text-rust opacity-40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-ink font-semibold">{product.name}</p>
                          <p className="font-mono text-xs text-ink/50">{product.sizeLabel}</p>
                        </div>
                        <p className="text-sm text-ink whitespace-nowrap font-mono">
                          {money((product.price ?? 0) * line.qty, product.currency)}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-line">
                          <button
                            className="w-7 h-7 text-ink/80 hover:text-ink"
                            onClick={() => updateQty(line.slug, line.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-7 text-center text-sm text-ink">{line.qty}</span>
                          <button
                            className="w-7 h-7 text-ink/80 hover:text-ink"
                            onClick={() => updateQty(line.slug, line.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-xs text-ink/50 hover:text-ink underline underline-offset-2"
                          onClick={() => removeItem(line.slug)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-sm text-ink mb-1 font-mono">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/50 mb-4">Delivery confirmed directly with you after ordering.</p>
              {checkingOut ? (
                <div className="border border-line bg-paper-deep px-4 py-3 text-xs text-ink/60">
                  We'll follow up on WhatsApp to confirm delivery and payment — no card details needed here.
                </div>
              ) : (
                <button
                  onClick={() => setCheckingOut(true)}
                  className="w-full bg-ink hover:bg-rust transition-colors text-paper text-sm font-bold uppercase tracking-wide py-3"
                >
                  Checkout
                </button>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
