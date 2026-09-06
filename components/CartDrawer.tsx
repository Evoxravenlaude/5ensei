"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProduct } from "@/lib/products";
import VesselArt from "./VesselArt";

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
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className="absolute right-0 top-0 h-full w-full max-w-md bg-ink border-l border-line flex flex-col animate-[drawer-in_0.35s_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="text-sm uppercase tracking-widest2 text-bone">
            Your bag {lines.length > 0 && `(${lines.reduce((n, l) => n + l.qty, 0)})`}
          </h2>
          <button onClick={closeCart} aria-label="Close bag" className="text-bone/70 hover:text-bone">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
            <p className="text-bone/90 font-display text-lg">Your bag is empty.</p>
            <p className="text-smoke text-sm">
              Every formula here is blended when you order it — nothing is sitting on a shelf.
            </p>
            <Link
              href="/collections/smell"
              onClick={closeCart}
              className="mt-3 text-xs uppercase tracking-widest2 text-copper-bright hover:text-bone transition-colors"
            >
              Start with fragrance
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-line px-6">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                const size = product.sizes.find((s) => s.label === line.sizeLabel);
                return (
                  <li key={line.id} className="py-5 flex gap-4">
                    <div className="h-20 w-14 shrink-0 text-smoke">
                      <VesselArt format={product.format} tint={product.tint} code={product.code} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-bone">{product.name}</p>
                          <p className="text-xs text-smoke">{line.sizeLabel}</p>
                          {line.personalization && (
                            <p className="text-xs text-copper-bright mt-0.5">
                              “{line.personalization}”
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-bone whitespace-nowrap">
                          ${((size?.price ?? 0) * line.qty).toFixed(0)}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-line">
                          <button
                            className="w-7 h-7 text-bone/80 hover:text-bone"
                            onClick={() => updateQty(line.id, line.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm text-bone">{line.qty}</span>
                          <button
                            className="w-7 h-7 text-bone/80 hover:text-bone"
                            onClick={() => updateQty(line.id, line.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-xs text-smoke hover:text-bone underline underline-offset-2"
                          onClick={() => removeItem(line.id)}
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
              <div className="flex items-center justify-between text-sm text-bone mb-1">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <p className="text-xs text-smoke mb-4">
                Shipping and personalization confirmed at checkout.
              </p>
              {checkingOut ? (
                <div className="border border-line bg-ink-soft px-4 py-3 text-xs text-smoke">
                  This is a design prototype — there's no live payment step wired up yet.
                </div>
              ) : (
                <button
                  onClick={() => setCheckingOut(true)}
                  className="w-full bg-copper hover:bg-copper-bright transition-colors text-bone text-sm tracking-wide py-3"
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
