import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        editorial: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["'Inter'", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        edelvin: {
          blue: "#0066B3",
          darkBlue: "#004B87",
          deepNavy: "#0A192F",
          lightBlue: "#E8F2FA",
          subtle: "#F4F8FC",
          accent: "#0077D4",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F4EED9",
          200: "#E9DCB5",
          300: "#DEC88D",
          400: "#CFB062",
          DEFAULT: "#B89742",
          600: "#A18134",
          700: "#806428",
          800: "#634D21",
          900: "#4B3A1C",
          metallic: "#C8A962",
          foil: "#D4AF37",
          light: "#F0E4C3",
          dark: "#8C6D2D",
        },
        hemlock: {
          black: "#0F1412",
          dark: "#141A18",
          stone: "#F4F4F0",
          canvas: "#FAFAF7",
          border: "#E2E2DB",
          borderDark: "#262D2A",
          accent: "#0066B3",
          accentHover: "#004B87",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3.5s ease-in-out infinite",
        "gradient-flow": "gradient-flow 8s ease infinite",
        "fade-in": "fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-left": "slide-left 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
