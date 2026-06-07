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
        primary: "#7C3AED",       // Violet
        primarySoft: "#EDE9FE",   // Violet tint
        background: "#09090B",    // True near-black
        surface: "#18181B",       // Card bg (zinc-900)
        surface2: "#27272A",      // Input/elevation bg (zinc-800)
        border: "#3F3F46",         // Border (zinc-700)
        textPrimary: "#FAFAFA",   // Pure off-white (zinc-50)
        textMuted: "#A1A1AA",     // Zinc-400
        accent: "#F59E0B",        // Amber (AI only)
        danger: "#EF4444",        // Danger (report/block only)
        pop: "#EC4899",           // Pink (Home Hero gradient only)
      },
      borderRadius: {
        'default': '16px',
        'card': '24px',
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(120%) translateX(0) scale(0.8)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-20%) translateX(20px) scale(1.2)', opacity: '0' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'bubble-pop': {
          '0%': { transform: 'scale(0.95) translateY(5px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-dot': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' }
        }
      },
      animation: {
        float: 'float 8s infinite linear',
        'ring-pulse': 'ring-pulse 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'bubble-pop': 'bubble-pop 0.15s ease-out forwards',
        'slide-up': 'slide-up 0.25s ease-out forwards',
        'bounce-dot': 'bounce-dot 0.6s infinite ease-in-out',
        shake: 'shake 0.2s ease-in-out 2'
      },
    },
  },
  plugins: [],
};
export default config;
