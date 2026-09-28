"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, money } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ComingSoonGlyph from "./VesselArt";

/** Le Labo-style card: bottle on paper, name and format under it, quick actions that rise on hover. */
export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const available = product.status === "available";

  return (
    <div className="group relative flex flex-col border border-line bg-paper">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-64 sm:h-72 flex items-center justify-center overflow-hidden bg-paper-deep/40">
          {available ? (
            <Image
              src={product.image}
              alt={product.name}
              width={289}
              height={739}
              className="h-[78%] w-auto drop-shadow-[0_18px_22px_rgba(23,19,16,0.18)] transition-transform duration-500 ease-signature group-hover:-translate-y-1.5"
            />
          ) : (
            <ComingSoonGlyph className="h-16 w-auto text-rust opacity-35" />
          )}
        </div>
        <div className="px-5 pt-4 pb-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink">{product.name}</h3>
            <span className="font-mono text-[0.75rem] text-ink/70">{available ? money(product.price, product.currency) : ""}</span>
          </div>
          <p className="font-mono text-[0.7188rem] text-ink/55 mt-1 lowercase">{available ? product.sizeLabel : "in development…"}</p>
        </div>
      </Link>
      <div className="card-actions absolute left-0 right-0 bottom-0 grid grid-cols-2 border-t border-line bg-paper">
        {available ? (
          <>
            <button
              onClick={() => addItem(product.slug)}
              className="py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] bg-ink text-paper hover:bg-rust transition-colors"
            >
              Add to bag
            </button>
            <Link href={`/products/${product.slug}#label`} className="py-3 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] hover:bg-paper-deep transition-colors">
              Personalise
            </Link>
          </>
        ) : (
          <Link href="/contact" className="col-span-2 py-3 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] hover:bg-paper-deep transition-colors">
            Notify me
          </Link>
        )}
      </div>
    </div>
  );
}
