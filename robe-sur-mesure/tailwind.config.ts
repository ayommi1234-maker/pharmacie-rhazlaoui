import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette féminine, élégante, artisanale
        creme: "#FBF7F0",
        ivoire: "#F3ECE1",
        encre: "#2B2320", // brun foncé / noir doux pour le texte
        bordeaux: "#7A2E33",
        terracotta: "#B5643C",
        dore: "#B9975B",
        sauge: "#8A9A82",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
