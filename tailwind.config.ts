import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        neutral: {
            0: "#ffffff",
            300: "#d2d1d6",
            500: "#8784a4",
            700: "#4b486a",
            900: "#0c082b",
        },

        orange: {
          500: "#f57261",
          700: "#e16151",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
