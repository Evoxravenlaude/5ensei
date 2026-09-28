"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [lifting, setLifting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seen: string | null = null;
    try {
      seen = sessionStorage.getItem("5ensei-intro-seen");
    } catch {
      seen = null;
    }

    if (seen || reducedMotion) {
      setVisible(false);
      setShouldRender(false);
      document.body.classList.remove("loading");
      return;
    }

    try {
      sessionStorage.setItem("5ensei-intro-seen", "1");
    } catch {
      /* ignore */
    }

    document.body.classList.add("loading");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setLifting(true);
      document.body.classList.remove("loading");
      window.setTimeout(() => setShouldRender(false), 900);
    };

    const primary = window.setTimeout(finish, 1900);
    // Hard safety net: never let the loader sit on screen longer than this,
    // no matter what else does or doesn't run.
    const safety = window.setTimeout(finish, 4000);

    return () => {
      window.clearTimeout(primary);
      window.clearTimeout(safety);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-ink flex items-center justify-center transition-opacity duration-700 ${
        lifting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ visibility: !visible ? "hidden" : undefined }}
    >
      <div className="flex flex-col items-center gap-[18px]">
        <Image
          src="/logo-mark.png"
          alt=""
          width={80}
          height={140}
          className="h-14 w-auto animate-mark-fade"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(90%) sepia(12%) saturate(500%) hue-rotate(340deg) brightness(101%)",
          }}
        />
        <span className="text-center text-brass-soft font-mono font-bold text-[11px] tracking-[0.2em] lowercase animate-tag-fade [animation-delay:1.1s]">
          presence before introduction
          <span className="block mt-2 font-mono text-[11px] tracking-normal lowercase text-paper/50 font-normal">
            a nigerian fragrance house, ilorin
          </span>
        </span>
      </div>
    </div>
  );
}
