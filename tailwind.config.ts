import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#03030A",
          secondary: "#070A14",
          navy: "#0B1020",
        },
        card: "rgba(10, 12, 24, 0.75)",
        neon: {
          purple: "#A855F7",
          violet: "#7C3AED",
          soft: "#C084FC",
        },
        ink: {
          white: "#F8FAFC",
          muted: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(168, 85, 247, 0.45)",
        "glow-sm": "0 0 20px -6px rgba(168, 85, 247, 0.4)",
        "glow-lg": "0 0 80px -12px rgba(124, 58, 237, 0.5)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)",
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
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
