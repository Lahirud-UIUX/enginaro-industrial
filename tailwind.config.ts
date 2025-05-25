import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6301',
        black: '#000000',
        white: '#ffffff',
        background: '#F5F5F5',
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