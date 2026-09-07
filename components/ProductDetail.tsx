"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, money } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ComingSoonGlyph from "./VesselArt";

const TABS: { key: "scent" | "bottle" | "delivery"; label: string }[] = [
  { key: "scent", label: "The scent" },
  { key: "bottle", label: "The bottle" },
  { key: "delivery", label: "Delivery" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<"scent" | "bottle" | "delivery">("scent");
  const [justAdded, setJustAdded] = useState(false);
  const available = product.status === "available";

  function handleAdd() {
    if (!available) return;
    addItem(product.slug);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10 py-14 grid md:grid-cols-2 gap-12">
      <div className="md:sticky md:top-24 md:self-start flex items-center justify-center border border-line bg-gradient-to-b from-paper-deep to-paper py-16">
        {available ? (
          <Image
            src={product.image}
            alt={product.name}
            width={340}
            height={420}
            className="h-72 sm:h-[420px] w-auto object-contain drop-shadow-[0_26px_32px_rgba(23,19,16,0.2)]"
          />
        ) : (
          <ComingSoonGlyph className="h-40 w-auto text-rust opacity-30" />
        )}
      </div>

      <div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-rust mb-3">
          {available ? "Now available" : "In development"}
        </p>
        <h1 className="font-display font-bold italic text-3xl sm:text-4xl text-ink mb-2">
          {product.name}
        </h1>
        <p className="font-mono font-bold text-sm text-rust mb-6">
          {money(product.price, product.currency)} &middot; {product.sizeLabel}
        </p>
        {product.description && (
          <p className="text-ink/72 leading-relaxed max-w-[46ch] mb-6">{product.description}</p>
        )}

        {available && product.tabs.scent && (
          <div className="border-t border-line">
            <div className="flex gap-6 pt-4">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`font-mono font-bold text-[11px] uppercase tracking-widest2 pb-3 border-b-2 transition-colors ${
                    activeTab === t.key
                      ? "text-ink border-rust"
                      : "text-ink/40 border-transparent hover:text-ink/70"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="pt-5 text-sm text-ink/70 leading-relaxed max-w-[48ch]">
              {product.tabs[activeTab]}
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row gap-3">
          {available ? (
            <>
              <button
                onClick={handleAdd}
                className="bg-ink hover:bg-rust transition-colors text-paper text-sm font-bold uppercase tracking-wide px-7 py-3.5"
              >
                {justAdded ? "Added \u2713" : "Add to bag"}
              </button>
              <a
                href="https://wa.me/2348034900874"
                className="border border-ink text-ink text-sm font-bold uppercase tracking-wide px-7 py-3.5 text-center hover:bg-ink hover:text-paper transition-colors"
              >
                Order on WhatsApp
              </a>
            </>
          ) : (
            <Link
              href="/contact"
              className="bg-ink hover:bg-rust transition-colors text-paper text-sm font-bold uppercase tracking-wide px-7 py-3.5 text-center"
            >
              Get notified
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
