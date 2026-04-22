import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        v: {
          black:       "#020617",
          dark:        "#061729",
          base:        "#0A2540",
          mid:         "#0F172A",
          light:       "#1B3F6B",
          elec:        "#1EA7FF",
          "elec-l":    "#4FC3FF",
          "elec-d":    "#0D8AE6",
          gold:        "#D4AF37",
          "gold-l":    "#F2D77B",
          "gold-d":    "#A88419",
          slate:       "#94A3B8",
          gray:        "#334155",
          soft:        "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};

export default config;
