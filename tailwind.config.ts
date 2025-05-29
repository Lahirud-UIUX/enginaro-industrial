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
        'primary-dark': '#cc5000', 
        black: '#000000',
        white: '#ffffff',
        background: '#F5F5F5',
        'dark-background': '#000000',
        'dark-card': '#141414',
        'dark-surface': '#1a1a1a',
        'dark-border': '#333333',
        'dark-text': '#ffffff',
        'dark-text-secondary': '#ffffff',
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