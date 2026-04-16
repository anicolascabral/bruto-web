import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#E6FF7B",
        bruto: {
          black: "#000000",
          white: "#FFFFFF",
          yellow: "#E6FF7B",
          gray: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": "clamp(5rem, 22vw, 22rem)",
        "display": "clamp(3rem, 10vw, 10rem)",
        "section": "clamp(2rem, 5vw, 5rem)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        ultra: "-0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
