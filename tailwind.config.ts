import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        cv: {
          ink: "hsl(var(--cv-ink))",
          muted: "hsl(var(--cv-muted))",
          line: "hsl(var(--cv-line))",
          surface: "hsl(var(--cv-surface))",
          surface2: "hsl(var(--cv-surface2))",
          navy: "#050F1C",
          blue: "#1664C0",
          "blue-bright": "#2277E0",
          "blue-light": "#7CB8F8",
          "blue-fill": "#E8F3FF",
          teal: "#0E9E7A",
          purple: "#6954D4",
          amber: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        cv: "1240px",
        "cv-content": "1120px",
      },
      letterSpacing: {
        "cv-h1": "-0.025em",
        "cv-h2": "-0.018em",
        "cv-label": "0.14em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
