import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#ff6301',
        black: '#000000',
        white: '#ffffff',
        background: '#F5F5F5',
        'dark-background': '#0a0a0a',
        'dark-card': '#111111',
        'dark-surface': '#1a1a1a',
        'dark-border': '#333333',
        'dark-text': '#ededed',
        'dark-text-secondary': '#a0a0a0',
      },
      fontFamily: {
        primary: ['var(--font-geist-sans)'],
        secondary: ['var(--font-inter)'],
      },
      borderRadius: {
        'full': '9999px',
      },
      spacing: {
        '20': '5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
};

export default config; 