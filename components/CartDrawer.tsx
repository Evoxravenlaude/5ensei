"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { getProduct, money } from "@/lib/products";
import { whatsappOrderLink } from "@/lib/whatsapp";
import ComingSoonGlyph from "./VesselArt";
import Label from "./Label";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") closeCart(); }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div className="drawer-bg absolute inset-0 bg-ink/50" onClick={closeCart} aria-hidden="true" />
      <aside role="dialog" aria-label="Shopping bag" className="absolute right-0 top-0 h-full w-full max-w-md bg-paper border-l border-line flex flex-col animate-drawer-in">
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink">Bag ({count})</h2>
          <button onClick={closeCart} aria-label="Close bag" className="text-ink/70 hover:text-ink">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
            <p className="font-mono text-ink/80 lowercase">your bag is empty…</p>
            <p className="text-ink/50 text-sm max-w-[30ch]">Soren is filled and finished by hand at the Ilorin atelier. Nothing sits pre-made on a shelf.</p>
            <Link href="/collection" onClick={closeCart} className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] border-b border-ink pb-0.5">
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
                  <li key={line.id} className="py-5 flex gap-4">
                    <div className="h-24 w-16 shrink-0 flex items-center justify-center bg-paper-deep/50">
                      {product.status === "available" ? (
                        <Image src={product.image} alt={product.name} width={289} height={739} className="h-full w-auto object-contain" />
                      ) : (
                        <ComingSoonGlyph className="h-10 w-auto text-rust opacity-40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em]">{product.name}</p>
                          <p className="font-mono text-[0.6875rem] text-ink/55 lowercase">{product.sizeLabel}</p>
                        </div>
                        <p className="font-mono text-sm whitespace-nowrap">{money((product.price ?? 0) * line.qty, product.currency)}</p>
                      </div>
                      <div className="mt-2 flex items-start gap-3">
                        <Label product={product.name} format={product.sizeLabel.toLowerCase()} name={line.label?.name} note={line.label?.note} className="w-[88px] shrink-0" tilt={false} />
                        <p className="font-mono text-[0.6875rem] text-ink/60 lowercase leading-relaxed pt-1">
                          label for: <span className="text-ink">{line.label?.name || "you"}</span>
                          {line.label?.note && <><br />&ldquo;{line.label.note}&rdquo;</>}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-line">
                          <button className="w-7 h-7 text-ink/80 hover:text-ink" onClick={() => updateQty(line.id, line.qty - 1)} aria-label="Decrease quantity">&minus;</button>
                          <span className="w-7 text-center text-sm">{line.qty}</span>
                          <button className="w-7 h-7 text-ink/80 hover:text-ink" onClick={() => updateQty(line.id, line.qty + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <button className="font-mono text-[0.6875rem] text-ink/50 hover:text-ink underline underline-offset-4 lowercase" onClick={() => removeItem(line.id)}>remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-sm mb-1 font-mono">
                <span className="lowercase">subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p className="font-mono text-[0.6875rem] text-ink/50 lowercase mb-4">delivery and payment are confirmed with you on whatsapp. no card details here.</p>
              <a
                href={whatsappOrderLink(lines, subtotal)}
                className="block w-full bg-ink hover:bg-rust transition-colors text-paper text-[0.75rem] font-semibold uppercase tracking-[0.14em] py-4 text-center"
              >
                Send order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
