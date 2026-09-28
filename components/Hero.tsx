"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Vapour from "./Vapour";
import { Product, money } from "@/lib/products";

const WHISPERS = [
  "presence before introduction…",
  "one accord, not forty notes…",
  "hand-filled in ilorin, in small batches…",
  "worn close, noticed slowly, remembered anyway…",
];

export default function Hero({ product }: { product: Product }) {
  const [text, setText] = useState(WHISPERS[0]);

  // Types each line out, pauses, erases, and moves on. Stops when reduced motion is preferred.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, k = WHISPERS[0].length, dir: 1 | -1 = -1, timer = 0, stopped = false;
    const tick = () => {
      if (stopped) return;
      const line = WHISPERS[i];
      k += dir;
      setText(line.slice(0, k));
      let delay = dir === 1 ? 42 + Math.random() * 50 : 16;
      if (dir === 1 && k >= line.length) { dir = -1; delay = 2800; }
      if (dir === -1 && k <= 0) { dir = 1; i = (i + 1) % WHISPERS.length; delay = 500; }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 2600);
    return () => { stopped = true; window.clearTimeout(timer); };
  }, []);

  return (
    <section className="relative bg-ink text-paper overflow-hidden min-h-[86svh] flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(166,66,31,0.28), transparent 65%)" }}
        />
        <Vapour className="mix-blend-screen" />
      </div>

      {/* the bottle */}
      <div className="relative flex-1 flex items-end justify-center pt-14 pb-24 sm:pb-28 px-6">
        <Image
          src={product.image}
          alt={`5ENSEI ${product.name}, ${product.sizeLabel}`}
          width={289}
          height={739}
          priority
          className="h-[56svh] sm:h-[60svh] max-h-[620px] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] animate-rise-in"
        />
      </div>

      {/* the caption, bottom-left, the way a lab writes on a jar */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-10 pb-8 sm:pb-10 grid gap-6 sm:grid-cols-[1fr_auto] items-end">
        <div>
          <h1 className="font-display font-bold uppercase tracking-[0.18em] text-sm sm:text-base">{product.name}</h1>
          <p className="whisper font-mono text-paper/85 text-[15px] sm:text-[17px] mt-2 min-h-[1.6em]" aria-live="off">
            {text}
          </p>
          <div className="mt-5 flex gap-6">
            <Link href={`/products/${product.slug}`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass-soft hover:text-paper transition-colors border-b border-brass-soft/50 pb-1">
              Discover
            </Link>
            <Link href="/philosophy" className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 hover:text-paper transition-colors pb-1">
              The house
            </Link>
          </div>
        </div>
        <p className="font-mono text-[11px] text-paper/55 text-left sm:text-right leading-relaxed">
          {product.sizeLabel}
          <br />
          {money(product.price, product.currency)}
        </p>
      </div>
    </section>
  );
}
