"use client";

import { useEffect, useRef } from "react";

/**
 * A slow rust vapour rising behind the bottle. Drawn on a tiny canvas (160px wide) that the browser
 * scales up, so the softness is free: no filters, ~30 frames a second, paused when off screen.
 */
export default function Vapour({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lite = window.matchMedia("(pointer: coarse)").matches || (navigator.hardwareConcurrency || 8) <= 4;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 160;
    const ratio = canvas.clientHeight / Math.max(1, canvas.clientWidth);
    const H = Math.round(W * (ratio || 1.2));
    canvas.width = W;
    canvas.height = H;

    type Blob = { x: number; y: number; r: number; vy: number; sway: number; phase: number; a: number; hue: number };
    const N = lite ? 7 : 11;
    const blobs: Blob[] = Array.from({ length: N }, (_, i) => spawn(i / N));
    function spawn(t = Math.random()): Blob {
      return {
        x: W * (0.32 + Math.random() * 0.36),
        y: H * (1.05 - t * 1.3),
        r: W * (0.16 + Math.random() * 0.2),
        vy: 0.06 + Math.random() * 0.08,
        sway: 3 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        a: 0.12 + Math.random() * 0.14,
        hue: Math.random(),
      };
    }

    let raf = 0, last = 0, visible = true, t = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    const frame = (now: number) => {
      if (!visible) return;
      raf = requestAnimationFrame(frame);
      if (now - last < (lite ? 40 : 33)) return; // ~25-30 fps is plenty for smoke
      last = now;
      t += 1;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.y -= b.vy;
        const x = b.x + Math.sin(t * 0.012 + b.phase) * b.sway;
        // fade in near the neck of the bottle, fade out near the top
        const life = Math.min(1, (H - b.y) / (H * 0.25)) * Math.min(1, Math.max(0, b.y / (H * 0.35)));
        const g = ctx.createRadialGradient(x, b.y, 0, x, b.y, b.r);
        const warm = b.hue < 0.6;
        const c = warm ? "166,66,31" : "183,146,74";
        g.addColorStop(0, `rgba(${c},${(b.a * life).toFixed(3)})`);
        g.addColorStop(0.55, `rgba(${c},${(b.a * life * 0.35).toFixed(3)})`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        if (b.y < -b.r) blobs[i] = spawn(0);
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (visible) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={`vapour ${className}`} aria-hidden="true" />;
}
