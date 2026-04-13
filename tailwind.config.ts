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
        // Backgrounds
        "bg-primary": "#0F0E0C",
        "bg-secondary": "#1A1815",
        "bg-tertiary": "#252220",
        // Text
        "text-primary": "#F5F1EA",
        "text-secondary": "#C9C0AE",
        "text-tertiary": "#8A8275",
        // Accent
        accent: "#B8924A",
        "accent-hover": "#D1A85C",
        "accent-muted": "#5C4A28",
        // Earth tones
        "olive-deep": "#2D3320",
        "stone-warm": "#6B5D4A",
        terra: "#8B4A2B",
        // Functional
        border: "#2A2622",
        "border-strong": "#3D3833",
        success: "#6B8E4E",
        error: "#A84A2B",
      },
      fontFamily: {
        // Hebrew
        "frank-ruhl": ["var(--font-frank-ruhl)", "serif"],
        heebo: ["var(--font-heebo)", "sans-serif"],
        // English
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 6.5rem)", { lineHeight: "1.1" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15" }],
        heading: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2" }],
        subheading: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3" }],
        "body-lg": ["clamp(1.125rem, 1.5vw, 1.25rem)", { lineHeight: "1.7" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
        overline: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },
      spacing: {
        "section-sm": "6rem",
        "section-md": "8rem",
        "section-lg": "10rem",
      },
      maxWidth: {
        content: "1280px",
        prose: "720px",
        "prose-sm": "640px",
        "prose-xs": "600px",
      },
      animation: {
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(180deg, rgba(15,14,12,0.4) 0%, rgba(15,14,12,0.85) 100%)",
        "section-fade":
          "linear-gradient(180deg, transparent 0%, rgba(15,14,12,0.6) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
