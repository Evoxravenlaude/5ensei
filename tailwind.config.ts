import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171310",
        paper: "#FBF8F1",
        "paper-deep": "#F0E7D4",
        rust: "#A6421F",
        "rust-deep": "#7A2F16",
        brass: "#B7924A",
        "brass-soft": "#D2B87C",
        line: "#17130026",
        "line-soft": "#FBF8F133",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-courier-prime)", "Courier New", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "floaty-sm": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.5px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "mark-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "tag-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        chapter: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "scroll-drip": {
          "0%": { top: "-100%" },
          "60%": { top: "100%" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "drawer-in": "drawer-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        floaty: "floaty 4.6s ease-in-out infinite",
        "floaty-sm": "floaty-sm 2.6s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        "mark-fade": "mark-fade 1.8s ease both",
        "tag-fade": "tag-fade 1.4s ease both",
        "scroll-drip": "scroll-drip 2.2s ease-in-out infinite",
        chapter: "chapter 7s linear both",
      },
    },
  },
  plugins: [],
};
export default config;
