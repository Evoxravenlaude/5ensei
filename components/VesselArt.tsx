"use client";

import { Format } from "@/lib/products";

function EauDeParfum({ tint, code }: { tint: string; code: number }) {
  return (
    <svg viewBox="0 0 200 280" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`liquid-${code}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.95" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="82" y="20" width="36" height="26" fill="currentColor" className="text-graphite" />
      {/* neck */}
      <rect x="90" y="46" width="20" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke" />
      {/* bottle body */}
      <rect
        x="52"
        y="64"
        width="96"
        height="180"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-smoke"
      />
      {/* liquid fill */}
      <rect x="53.5" y="150" width="93" height="93" fill={`url(#liquid-${code})`} />
      {/* label */}
      <rect x="66" y="120" width="68" height="52" fill="none" stroke="currentColor" strokeWidth="1" className="text-bone" />
      <text
        x="100"
        y="142"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "600 11px var(--font-grotesk), sans-serif", letterSpacing: "0.08em" }}
      >
        5ENSEI
      </text>
      <text
        x="100"
        y="160"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "400 20px var(--font-grotesk), sans-serif" }}
      >
        {code}
      </text>
    </svg>
  );
}

function Candle({ tint, code }: { tint: string; code: number }) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-hidden="true">
      {/* flame + wisp */}
      <g className="origin-bottom animate-wisp motion-reduce:animate-none">
        <ellipse cx="100" cy="46" rx="4" ry="10" fill={tint} opacity="0.85" />
        <path d="M100 30 C 96 10, 104 8, 100 -2" stroke={tint} strokeWidth="1" fill="none" opacity="0.4" />
      </g>
      {/* wick */}
      <line x1="100" y1="50" x2="100" y2="62" stroke="currentColor" className="text-smoke" strokeWidth="1.5" />
      {/* jar */}
      <rect
        x="46"
        y="62"
        width="108"
        height="120"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-smoke"
      />
      <rect x="46" y="150" width="108" height="32" fill={tint} opacity="0.18" />
      {/* label band */}
      <rect x="46" y="106" width="108" height="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-bone" />
      <text
        x="100"
        y="124"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "600 11px var(--font-grotesk), sans-serif", letterSpacing: "0.08em" }}
      >
        5ENSEI
      </text>
      <text
        x="100"
        y="140"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "400 16px var(--font-grotesk), sans-serif" }}
      >
        {code}
      </text>
      {/* base */}
      <rect x="40" y="182" width="120" height="10" fill="currentColor" className="text-graphite" />
    </svg>
  );
}

function Vessel({ tint, code }: { tint: string; code: number }) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-hidden="true">
      <rect x="60" y="30" width="12" height="24" fill="currentColor" className="text-graphite" />
      <path
        d="M50 54 h100 v40 c0 46 -18 66 -50 96 c-32 -30 -50 -50 -50 -96 z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-smoke"
      />
      <path
        d="M52 100 c0 44 17 63 48 90 c31 -27 48 -46 48 -90 z"
        fill={tint}
        opacity="0.55"
      />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "600 10px var(--font-grotesk), sans-serif", letterSpacing: "0.08em" }}
      >
        5ENSEI
      </text>
      <text
        x="100"
        y="128"
        textAnchor="middle"
        className="fill-bone"
        style={{ font: "400 15px var(--font-grotesk), sans-serif" }}
      >
        {code}
      </text>
    </svg>
  );
}

export default function VesselArt({
  format,
  tint,
  code,
  className = "",
}: {
  format: Format;
  tint: string;
  code: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {format === "candle" ? (
        <Candle tint={tint} code={code} />
      ) : format === "eau de parfum" ? (
        <EauDeParfum tint={tint} code={code} />
      ) : (
        <Vessel tint={tint} code={code} />
      )}
    </div>
  );
}
