"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import VesselArt from "./VesselArt";

const NOTE_ROWS: { key: "top" | "heart" | "base"; label: string }[] = [
  { key: "top", label: "Top" },
  { key: "heart", label: "Heart" },
  { key: "base", label: "Base" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [personalization, setPersonalization] = useState("");
  const [openPanel, setOpenPanel] = useState<string | null>("story");
  const [justAdded, setJustAdded] = useState(false);

  const size = product.sizes[sizeIdx];

  function handleAdd() {
    addItem(product.slug, size.label, personalization.trim() || undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function togglePanel(key: string) {
    setOpenPanel((cur) => (cur === key ? null : key));
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid md:grid-cols-2 gap-12">
      {/* Visual */}
      <div className="md:sticky md:top-24 md:self-start flex items-center justify-center border border-line bg-ink-soft py-16">
        <VesselArt
          format={product.format}
          tint={product.tint}
          code={product.code}
          className="h-80 sm:h-[420px] w-auto text-smoke"
        />
      </div>

      {/* Details */}
      <div>
        <p className="text-xs uppercase tracking-widest2 text-copper-bright mb-3">
          {product.format} — {product.sense}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-bone mb-2">{product.name}</h1>
        <p className="text-bone/70 mb-8">{product.tagline}</p>

        {/* Size selector */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSizeIdx(i)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  i === sizeIdx
                    ? "border-copper text-bone bg-copper/10"
                    : "border-line text-bone/70 hover:border-smoke"
                }`}
              >
                {s.label} · ${s.price}
              </button>
            ))}
          </div>
        </div>

        {/* Personalization */}
        {product.personalizable && (
          <div className="mb-8">
            <label htmlFor="personalize" className="text-xs uppercase tracking-widest2 text-smoke mb-3 block">
              Personalize the label (optional)
            </label>
            <input
              id="personalize"
              type="text"
              maxLength={40}
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value)}
              placeholder="For: You"
              className="w-full bg-transparent border border-line px-4 py-3 text-sm text-bone placeholder:text-smoke focus:outline-none focus:border-copper-bright"
            />
            <p className="text-xs text-smoke mt-2">
              Stamped under the batch date. Leave blank and we'll label it “For: You.”
            </p>
          </div>
        )}

        <button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-copper hover:bg-copper-bright transition-colors text-bone text-sm tracking-wide px-8 py-3.5"
        >
          {justAdded ? "Added to bag ✓" : `Add to bag — $${size.price}`}
        </button>

        {/* Notes breakdown */}
        <div className="mt-12 border-t border-line pt-8">
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-5">Composition</p>
          <div className="space-y-4">
            {NOTE_ROWS.map((row, i) => (
              <div key={row.key} className="grid grid-cols-[70px_1fr] gap-4 items-start">
                <span className="text-xs text-smoke pt-0.5">{row.label}</span>
                <div>
                  <p className="text-sm text-bone/90">{product.notes[row.key].join(" · ")}</p>
                  <div className="mt-1.5 h-1 bg-line">
                    <div
                      className="h-1 bg-copper"
                      style={{ width: `${100 - i * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="mt-10 border-t border-line">
          {[
            { key: "story", label: "The story", body: product.description },
            {
              key: "shipping",
              label: "Shipping & returns",
              body: "Ships within 2 business days. Personalized items are made to order and are final sale; unpersonalized items may be returned within 30 days in original condition.",
            },
            {
              key: "refill",
              label: "Refill program",
              body: "Bring this vessel back to any 5ensei counter for a 20% refill discount, or mail it back using the prepaid label in your original order.",
            },
          ].map((panel) => (
            <div key={panel.key} className="border-b border-line">
              <button
                onClick={() => togglePanel(panel.key)}
                className="w-full flex items-center justify-between py-4 text-left text-sm text-bone"
                aria-expanded={openPanel === panel.key}
              >
                {panel.label}
                <span className="text-smoke">{openPanel === panel.key ? "−" : "+"}</span>
              </button>
              {openPanel === panel.key && (
                <p className="pb-5 text-sm text-bone/70 leading-relaxed max-w-lg">
                  {panel.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
