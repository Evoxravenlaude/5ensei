"use client";

import { useEffect, useRef, useState } from "react";
import { FILM, isLite } from "@/lib/film";

/**
 * The scent in three notes, each one a chapter of the film. Left alone it tours the notes;
 * pick one and that chapter loops until you pick another.
 */
export default function NotesFilm({ notes, stacked = false }: { notes?: string[]; stacked?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const chapters = FILM.chapters.slice(0, 3);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.src = isLite() ? FILM.srcLite : FILM.src;
    v.currentTime = chapters[0].start;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTime = () => {
    const v = video.current;
    if (!v) return;
    const c = chapters[active];
    setProgress(Math.min(1, Math.max(0, (v.currentTime - c.start) / (c.end - c.start))));
    if (v.currentTime >= c.end - 0.08 || v.currentTime < c.start - 0.5) {
      const next = pinned ? active : (active + 1) % chapters.length;
      v.currentTime = chapters[next].start;
      if (next !== active) setActive(next);
    }
  };
  const pick = (i: number) => {
    const v = video.current;
    setActive(i); setPinned(true); setProgress(0);
    if (v) { v.currentTime = chapters[i].start; v.play().catch(() => {}); }
  };

  return (
    <div className={`grid ${stacked ? "" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"} gap-10 lg:gap-16 items-center`}>
      <div className="relative aspect-[720/1180] max-h-[70svh] w-full max-w-[420px] xl:max-w-[560px] mx-auto md:mx-0 overflow-hidden bg-[#0f0c0a]">
        <video ref={video} muted playsInline preload="metadata" poster="/soren-film-cream.jpg" onTimeUpdate={onTime} className="absolute inset-0 h-full w-full object-cover" aria-label="The three notes of Soren" />
      </div>
      <ol className="border-t border-line">
        {chapters.map((c, i) => (
          <li key={c.key} className="border-b border-line">
            <button onClick={() => pick(i)} className="w-full text-left py-6 group" aria-current={i === active ? "true" : undefined}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={`text-[0.8125rem] font-semibold uppercase tracking-[0.16em] transition-colors ${i === active ? "text-ink" : "text-ink/40 group-hover:text-ink/70"}`}>{notes?.[i] ?? c.label}</span>
                <span className="font-mono text-[0.6875rem] text-ink/40 lowercase">{i === 0 ? "opening" : i === 1 ? "heart" : "base"}</span>
              </div>
              <p className={`font-mono text-[0.875rem] lowercase leading-relaxed mt-2 max-w-[44ch] transition-all duration-500 overflow-hidden ${i === active ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>{c.line}</p>
              <span className="block h-px bg-ink/10 mt-4 overflow-hidden"><span className="block h-full bg-ink origin-left" style={{ transform: `scaleX(${i === active ? progress : 0})` }} /></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
