import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F6F2",
        primary: {
          DEFAULT: "#123524",
          light: "#1c4e36",
          dark: "#0b2016",
        },
        secondary: {
          DEFAULT: "#3E5F44",
          light: "#547e5c",
          dark: "#2b4330",
        },
        accent: {
          DEFAULT: "#E07A5F",
          light: "#ea957f",
          dark: "#cb6145",
        },
        luxury: {
          DEFAULT: "#D4A373",
          light: "#e2bd96",
          dark: "#b88350",
        },
        voyanta: {
          bg: "#F8F6F2",
          card: "#FFFFFF",
          border: "#EAE4DD",
          muted: "#71797E",
          sand: "#F0ECE5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        editorial: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        'voyanta': '0 10px 30px -10px rgba(18, 53, 36, 0.08)',
        'voyanta-hover': '0 20px 40px -12px rgba(18, 53, 36, 0.15)',
        'voyanta-glow': '0 0 40px rgba(212, 163, 115, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
