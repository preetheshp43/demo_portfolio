/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#120f17',
          deep: '#0c0a10',
          light: '#1b1722',
          surface: '#181420',
          border: '#2a2435',
        },
        light: {
          bg: '#faf9f6',
          surface: '#ffffff',
          subtle: '#f3efe6',
          border: '#e4dfd5',
          text: '#120f17',
          muted: '#66615b',
        },
        ink: {
          DEFAULT: '#f4f1ea',
          muted: '#a8a29e',
          faint: '#78716c',
          subtle: '#4b4556',
        },
        accent: {
          DEFAULT: '#2f7d6d',
          hover: '#3ea894',
          subtle: '#1d4d43',
          glow: 'rgba(47, 125, 109, 0.25)',
          light: '#5ec4b0',
          dark: '#1e5449',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Poppins', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.07em',
        widest: '0.2em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
