import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14171A",
        "ink-soft": "#1B1F23",
        bone: "#EFEAE0",
        paper: "#F7F4EE",
        graphite: "#2B2F33",
        copper: "#A9673A",
        "copper-bright": "#C97D48",
        moss: "#4E5B43",
        smoke: "#8B8D89",
        line: "#3A3E3F",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-grotesk)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        wisp: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)", opacity: "0.35" },
          "50%": { transform: "translateY(-6px) scaleY(1.08)", opacity: "0.6" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        wisp: "wisp 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
