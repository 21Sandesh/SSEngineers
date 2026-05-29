import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FC",
        surface: "#FFFFFF",
        ink: "#0A0F1E",
        "ink-soft": "#374663",
        "ink-muted": "#64748B",
        steel: "#64748B",
        line: "rgba(10,15,30,0.07)",
        "line-strong": "rgba(10,15,30,0.14)",
        brand: {
          DEFAULT: "#0F7A3C",
          deep: "#085A2C",
          mid: "#0D6934",
          tint: "#EDFAF3",
        },
        amber: {
          DEFAULT: "#F59E0B",
          deep: "#D97706",
          tint: "#FFFBEB",
        },
        night: {
          DEFAULT: "#0A0F1E",
          mid: "#111928",
          soft: "#1C2542",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,15,30,0.05), 0 2px 8px rgba(10,15,30,0.04)",
        "card-md": "0 4px 8px rgba(10,15,30,0.07), 0 12px 24px rgba(10,15,30,0.06)",
        "card-lg": "0 8px 16px rgba(10,15,30,0.08), 0 24px 48px rgba(10,15,30,0.07)",
        nav: "0 1px 0 rgba(10,15,30,0.06), 0 4px 16px rgba(10,15,30,0.04)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
