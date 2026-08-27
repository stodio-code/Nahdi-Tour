import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet merek Nahdi Tour (indigo)
        primary: {
          50: "#EEF0FB",
          100: "#DBDEF6",
          200: "#B9BFEE",
          300: "#949DE4",
          400: "#7A85DC",
          500: "#616FD5",
          600: "#4B56BA",
          700: "#394198",
          800: "#24286D",
          900: "#111341",
          950: "#05061F",
        },
        // Aksen emas untuk label harga/angka
        gold: {
          50: "#FBF6EC",
          100: "#F3E4C4",
          500: "#B8860B",
          700: "#8A6400",
          900: "#6B4500",
        },
        slate600: "#4A5560",
        slate300: "#C7CDD3",
        ink: "#1B2328",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        article: "44rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
