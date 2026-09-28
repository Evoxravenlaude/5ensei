"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, money } from "@/lib/products";
import { useCart, LabelPersonalization } from "@/lib/cart-context";
import { whatsappProductLink } from "@/lib/whatsapp";
import ComingSoonGlyph from "./VesselArt";
import LabelComposer from "./LabelComposer";

const TABS: { key: "scent" | "bottle" | "delivery"; label: string }[] = [
  { key: "scent", label: "The scent" },
  { key: "bottle", label: "The bottle" },
  { key: "delivery", label: "Delivery" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<"scent" | "bottle" | "delivery">("scent");
  const [label, setLabel] = useState<LabelPersonalization>({ name: "", note: "" });
  const [justAdded, setJustAdded] = useState(false);
  const available = product.status === "available";

  function handleAdd() {
    if (!available) return;
    addItem(product.slug, label);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10 py-10 sm:py-14 grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="relative flex items-center justify-center border border-line bg-paper-deep/40 py-14 sm:py-20 overflow-hidden">
          {available ? (
            <Image
              src={product.image}
              alt={product.name}
              width={289}
              height={739}
              priority
              className="h-[380px] sm:h-[520px] w-auto object-contain drop-shadow-[0_30px_36px_rgba(23,19,16,0.22)]"
            />
          ) : (
            <ComingSoonGlyph className="h-40 w-auto text-rust opacity-30" />
          )}
        </div>
        <p className="mt-3 font-mono text-[11px] text-ink/50 lowercase">
          {available ? "filled and finished by hand at the ilorin atelier…" : "in development at the atelier…"}
        </p>
      </div>

      <div>
        <p className="font-mono text-[11.5px] text-ink/55 lowercase mb-3">{available ? "now available…" : "in development…"}</p>
        <h1 className="font-display font-bold uppercase tracking-[0.12em] text-2xl sm:text-3xl text-ink">{product.name}</h1>
        <p className="font-mono text-sm text-ink/70 mt-2 lowercase">
          {product.sizeLabel}
          {available && <span className="ml-3 text-ink">{money(product.price, product.currency)}</span>}
        </p>
        {product.description && <p className="mt-6 text-ink/75 leading-relaxed max-w-[46ch]">{product.description}</p>}

        {available && product.tabs.scent && (
          <div className="mt-8 border-t border-line">
            <div className="flex gap-7 pt-4">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] pb-3 border-b transition-colors ${
                    activeTab === t.key ? "text-ink border-ink" : "text-ink/40 border-transparent hover:text-ink/70"
                  }`}
                  aria-pressed={activeTab === t.key}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="pt-5 text-sm text-ink/70 leading-relaxed max-w-[48ch]">{product.tabs[activeTab]}</p>
          </div>
        )}

        {available && (
          <section id="label" className="mt-10 border-t border-line pt-8 scroll-mt-24">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em]">Personalise your label</h2>
            <p className="font-mono text-[12px] text-ink/60 lowercase mt-1 mb-6">every bottle leaves the atelier with a typed label. tell us who it is for.</p>
            <LabelComposer product={product.name} format={product.sizeLabel.toLowerCase()} value={label} onChange={setLabel} />
          </section>
        )}

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row gap-3">
          {available ? (
            <>
              <button onClick={handleAdd} className="bg-ink hover:bg-rust transition-colors text-paper text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4">
                {justAdded ? "Added to bag" : label.name.trim() ? `Add to bag, for ${label.name.trim()}` : "Add to bag"}
              </button>
              <a
                href={whatsappProductLink(product.name, product.sizeLabel, label.name.trim() ? label : undefined)}
                className="border border-ink text-ink text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4 text-center hover:bg-ink hover:text-paper transition-colors"
              >
                Order on WhatsApp
              </a>
            </>
          ) : (
            <Link href="/contact" className="bg-ink hover:bg-rust transition-colors text-paper text-[12px] font-semibold uppercase tracking-[0.14em] px-7 py-4 text-center">
              Get notified
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
