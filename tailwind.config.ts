import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // All palette values are driven by CSS variables (see globals.css)
        // so the whole site can switch between dark (onyx) and light (cream).
        // NOTE: named "night" (not "base") on purpose — a color called "base"
        // collides with Tailwind's built-in `text-base` font-size utility.
        night: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          900: "rgb(var(--bg) / <alpha-value>)",
          800: "rgb(var(--bg-800) / <alpha-value>)",
          700: "rgb(var(--bg-700) / <alpha-value>)",
          600: "rgb(var(--bg-600) / <alpha-value>)",
        },
        // Champagne / gold accent system for a premium feel.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          violet: "rgb(var(--accent-violet) / <alpha-value>)",
          glow: "rgb(var(--accent-glow) / <alpha-value>)",
        },
        // Semantic text + surface tokens.
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          faint: "rgb(var(--faint) / <alpha-value>)",
        },
        card: "rgb(var(--card) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.05) 1px, transparent 1px)",
        "accent-gradient":
          "linear-gradient(135deg, #3B82F6 0%, #22D3EE 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59,130,246,0.4)",
        "glow-sm": "0 0 20px -6px rgba(34,211,238,0.35)",
        "glow-lg": "0 0 90px -20px rgba(59,130,246,0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
