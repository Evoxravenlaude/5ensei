"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, money } from "@/lib/products";

const TABS: { key: "scent" | "bottle" | "delivery"; label: string }[] = [
  { key: "scent", label: "The scent" },
  { key: "bottle", label: "The bottle" },
  { key: "delivery", label: "Delivery" },
];

export default function HomeInteractive({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"scent" | "bottle" | "delivery">("scent");

  return (
    <div className="grid md:grid-cols-[0.85fr_1.15fr] border border-line bg-paper">
      <div
        className="flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-line"
        style={{ background: "radial-gradient(circle at 50% 32%, #F0E7D4, #FBF8F1 65%)" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={280}
          height={340}
          className="w-3/5 max-w-[280px] h-auto drop-shadow-[0_26px_32px_rgba(23,19,16,0.2)]"
        />
      </div>
      <div className="p-9 sm:p-11 flex flex-col">
        <span className="font-mono font-bold text-[11px] uppercase tracking-widest2 text-rust">
          Now available
        </span>
        <h3 className="font-display font-bold italic text-3xl sm:text-4xl mt-2">{product.name}</h3>
        <div className="font-mono font-bold text-sm text-rust mt-2.5">
          {money(product.price, product.currency)} &middot; {product.sizeLabel}
        </div>
        <p className="mt-5 text-[15px] text-ink/72 max-w-[46ch]">{product.description}</p>

        <div className="mt-8 border-t border-line">
          <div className="flex gap-6 pt-4 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`font-mono font-bold text-[11px] uppercase tracking-widest2 pb-2.5 border-b-2 transition-colors ${
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

        <div className="mt-auto pt-7 flex gap-3.5 flex-wrap">
          <a
            href="https://wa.me/2348034900874"
            className="bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-7 py-3.5"
          >
            Order on WhatsApp
          </a>
          <Link
            href="/collection"
            className="border border-ink text-ink text-xs font-bold uppercase tracking-wide px-7 py-3.5 hover:bg-ink hover:text-paper transition-colors"
          >
            View full collection
          </Link>
        </div>
      </div>
    </div>
  );
}
