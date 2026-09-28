"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Product, money } from "@/lib/products";
import { FILM, isLite } from "@/lib/film";

/**
 * The film is the hero, the way Le Labo opens on a full-bleed video. It is portrait, so on wide screens
 * it stands as a tall panel on the cream stage with the caption beside it; on phones it fills the screen.
 */
export default function Hero({ product }: { product: Product }) {
  const video = useRef<HTMLVideoElement>(null);
  const [chapter, setChapter] = useState(0);
  const [sound, setSound] = useState(false);
  const [canSound, setCanSound] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const lite = isLite();
    setCanSound(!lite);
    v.src = lite ? FILM.srcLite : FILM.src;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    const onVis = () => { if (document.hidden) v.pause(); else v.play().catch(() => {}); };
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  const onTime = () => {
    const t = video.current?.currentTime ?? 0;
    const i = FILM.chapters.findIndex((c) => t < c.end);
    setChapter(i < 0 ? FILM.chapters.length - 1 : i);
  };
  const seek = (i: number) => { const v = video.current; if (!v) return; v.currentTime = FILM.chapters[i].start; v.play().catch(() => {}); };
  const toggleSound = () => { const v = video.current; if (!v) return; v.muted = sound; setSound(!sound); if (!sound) { v.currentTime = 0; v.play().catch(() => {}); } };

  return (
    <section
      className="relative overflow-hidden text-ink"
      style={{ background: "radial-gradient(ellipse 70% 60% at 62% 50%, #EFCDB9 0%, #F6E6DA 45%, #FBF8F1 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-0 sm:px-10 grid md:grid-cols-[minmax(0,1fr)_minmax(340px,44%)] items-stretch min-h-[86svh]">
        {/* caption */}
        <div className="order-2 md:order-1 px-5 sm:px-0 py-8 md:py-16 flex flex-col justify-end gap-6">
          <div>
            <h1 className="font-display font-bold uppercase tracking-[0.18em] text-sm sm:text-base">{product.name}</h1>
            <p className="font-mono text-[15px] sm:text-[17px] lowercase text-ink/85 mt-2 min-h-[1.6em]" aria-live="polite">
              {FILM.chapters[chapter].line}
            </p>
          </div>
          {/* the four chapters as a small timeline; the current one fills as the film plays */}
          <ol className="flex gap-2" aria-label="Chapters">
            {FILM.chapters.map((c, i) => (
              <li key={c.key} className="flex-1 max-w-[110px]">
                <button onClick={() => seek(i)} className="w-full text-left group" aria-current={i === chapter ? "step" : undefined}>
                  <span className="block h-px bg-ink/20 overflow-hidden"><span className={`block h-full bg-ink transition-transform origin-left ${i < chapter ? "scale-x-100" : i === chapter ? "animate-chapter" : "scale-x-0"}`} style={i === chapter ? { animationDuration: `${c.end - c.start}s` } : undefined} /></span>
                  <span className={`block mt-2 font-mono text-[10.5px] lowercase transition-colors ${i === chapter ? "text-ink" : "text-ink/45 group-hover:text-ink/70"}`}>{c.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href={`/products/${product.slug}`} className="font-mono text-[11px] uppercase tracking-[0.2em] border-b border-ink/60 pb-1 hover:border-ink">Discover</Link>
            <Link href={`/products/${product.slug}#label`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 hover:text-ink pb-1">Personalise</Link>
            <span className="font-mono text-[11px] text-ink/50 lowercase ml-auto">{product.sizeLabel.toLowerCase()}, {money(product.price, product.currency)}</span>
          </div>
        </div>

        {/* the film */}
        <div className="order-1 md:order-2 relative md:py-8">
          <div className="relative md:aspect-[720/1180] h-[78svh] md:h-auto md:max-h-[86svh] w-full overflow-hidden bg-[#0f0c0a] md:shadow-[0_40px_80px_-40px_rgba(23,19,16,0.45)]">
            <Image src={FILM.poster} alt="" fill sizes="(min-width: 768px) 44vw, 100vw" className={`object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`} priority />
            <video
              ref={video}
              poster={FILM.poster}
              muted
              loop
              playsInline
              preload="auto"
              onTimeUpdate={onTime}
              onPlaying={() => setReady(true)}
              aria-label="The Soren film: cream, marshmallow, musk, and the bottle"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {canSound && (
              <button onClick={toggleSound} className="absolute right-4 bottom-4 h-10 px-4 bg-paper/85 hover:bg-paper text-ink font-mono text-[11px] lowercase transition-colors" aria-pressed={sound}>
                {sound ? "sound on" : "sound"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
