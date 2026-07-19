import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0f0a1f',
        violet: '#1a1330',
        purple: '#4b2e83',
        mauve: '#8a6fa8',
        lavender: '#c9a8e0',
        cream: '#f8f3e9',
        glow: '#d8b4fe',
        teal: '#7fd8d0',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
