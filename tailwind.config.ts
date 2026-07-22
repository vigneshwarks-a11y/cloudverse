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
          card: "hsl(var(--cv-card))",
          navy: "#050F1C",
          blue: "#1664C0",
          "blue-bright": "#2278E0",
          "blue-light": "#7CB8F8",
          "blue-fill": "#E8F3FF",
          // Module accents (kept)
          teal: "#0E9E7A",
          purple: "#6954D4",
          amber: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        cv: "1360px",
        "cv-content": "1120px",
      },
      borderRadius: {
        cv: "20px",
      },
      letterSpacing: {
        "cv-h1": "-0.02em",
        "cv-h2": "-0.015em",
        "cv-label": "0.25em",
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
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-shift": {
          "0%,100%": { filter: "brightness(1)", transform: "translate(0,0)" },
          "25%":     { filter: "brightness(1.1)", transform: "translate(-40px,-30px)" },
          "50%":     { filter: "brightness(1)", transform: "translate(0,0)" },
          "75%":     { filter: "brightness(1.1)", transform: "translate(40px,-30px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "hero-shift": "hero-shift 24s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
