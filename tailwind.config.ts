import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
      },
      colors: {
        'retro-beige': {
          50: '#f8f6f1',
          100: '#ede8dc',
          200: '#d9d0b8',
          300: '#c0b28e',
          400: '#a8956a',
          500: '#8f7d55',
          600: '#786847',
          700: '#5f523b',
          800: '#4d4332',
          900: '#3f382a',
        },
        'retro-olive': {
          50: '#f5f6f4',
          100: '#e6e8e3',
          200: '#ced2c9',
          300: '#adb3a6',
          400: '#8d9484',
          500: '#73796b',
          600: '#5a5f54',
          700: '#494d44',
          800: '#3c3f38',
          900: '#343730',
        },
      },
      boxShadow: {
        'retro': 'inset -1px -1px 0 0 rgba(0,0,0,0.5), inset 1px 1px 0 0 rgba(255,255,255,0.5)',
        'retro-pressed': 'inset 1px 1px 0 0 rgba(0,0,0,0.5), inset -1px -1px 0 0 rgba(255,255,255,0.5)',
        'window': '2px 2px 0 0 rgba(0,0,0,0.2)',
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'boot': 'boot 2s ease-in-out',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        boot: {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
