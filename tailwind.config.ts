import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-syne)", "sans-serif"],
      },

      colors: {
        vanttage: {
          dark: "#061729",
          base: "#0A2540",
          light: "#1B3F6B",
          accent: "#1EA7FF",
        },
      },

      backgroundImage: {
        "vanttage-glow":
          "radial-gradient(circle at center, rgba(30,167,255,0.25) 0%, rgba(30,167,255,0.12) 35%, transparent 70%)",
      },
    },
  },

  plugins: [],
};

export default config;
