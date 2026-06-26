import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Dark tokens (admin panel keeps using these) ---
        bg: {
          main: "#03030A",
          secondary: "#070A14",
          navy: "#0B1020",
        },
        card: "rgba(20, 19, 17, 0.72)",
        // Admin accent (was neon purple) — repointed to the warm brand accent
        // for a clean, professional, non-cyberpunk CMS look.
        neon: {
          purple: "#C2502E",
          violet: "#B8492A",
          soft: "#D9663F",
        },
        ink: {
          white: "#F8FAFC",
          muted: "#A1A1AA",
        },
        // --- Light tokens (public studio site) ---
        paper: {
          DEFAULT: "#FAF7F0",
          soft: "#FFFDF8",
          deep: "#F7F3EA",
        },
        charcoal: {
          DEFAULT: "#111111",
          soft: "#171717",
        },
        stone: "#6B665F",
        line: "rgba(17, 17, 17, 0.12)",
        accent: {
          DEFAULT: "#C2502E",
          soft: "#D9663F",
          ink: "#7A2E16",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 18px 50px -14px rgba(0, 0, 0, 0.55)",
        "glow-sm": "0 8px 24px -10px rgba(0, 0, 0, 0.5)",
        "glow-lg": "0 30px 80px -16px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "rise": "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
