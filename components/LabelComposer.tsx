"use client";

import { useEffect, useState } from "react";
import Label from "./Label";
import type { LabelPersonalization } from "@/lib/cart-context";

/**
 * "Personalise your label": two fields and a live label. Le Labo writes "for: you" when you skip it; so do we.
 */
export default function LabelComposer({
  product,
  format,
  value,
  onChange,
}: {
  product: string;
  format: string;
  value: LabelPersonalization;
  onChange: (v: LabelPersonalization) => void;
}) {
  const [typed, setTyped] = useState(value.name);
  useEffect(() => setTyped(value.name), [value.name]);

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_minmax(220px,260px)] items-start">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="label-name" className="font-mono text-[11px] text-ink/60">
            for: <span className="text-ink/40">(a name, or leave it for &ldquo;you&rdquo;)</span>
          </label>
          <input
            id="label-name"
            value={typed}
            maxLength={24}
            autoComplete="off"
            spellCheck={false}
            placeholder="you"
            onChange={(e) => {
              setTyped(e.target.value);
              onChange({ ...value, name: e.target.value });
            }}
            className="bg-transparent border-b border-line py-2.5 font-mono text-[15px] text-ink focus:outline-none focus:border-rust"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="label-note" className="font-mono text-[11px] text-ink/60">
            a line for the label <span className="text-ink/40">(optional, 40 characters)</span>
          </label>
          <input
            id="label-note"
            value={value.note || ""}
            maxLength={40}
            autoComplete="off"
            placeholder="worn since september"
            onChange={(e) => onChange({ ...value, note: e.target.value })}
            className="bg-transparent border-b border-line py-2.5 font-mono text-[15px] text-ink focus:outline-none focus:border-rust"
          />
        </div>
        <p className="font-mono text-[11px] text-ink/50 leading-relaxed max-w-[38ch]">
          Typed on the label when your bottle is filled. It cannot be changed after the order is confirmed.
        </p>
      </div>
      <div className="flex justify-center sm:justify-end">
        <Label product={product} format={format} name={typed} note={value.note} className="w-[240px]" />
      </div>
    </div>
  );
}
