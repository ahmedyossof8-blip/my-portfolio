import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        'bone-white': '#ffffff',
        'ash-gray': '#9a9a9a',
        'silver-mist': '#bdbdbd',
        'electric-iris': '#8052ff',
        'electric-iris-hover': '#6e3eff',
        'saffron-spark': '#ffb829',
        'deep-verdant': '#15846e',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      letterSpacing: {
        display: '-4.52px',
        'heading-lg': '-3.12px',
        heading: '-1.68px',
        'heading-sm': '-1.68px',
        subheading: '-1.2px',
        'heading-2xs': '-0.48px',
        'nav-label': '0.35px',
      },
      boxShadow: {
        'dala-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'electric-glow': '0 0 30px rgba(128, 82, 255, 0.35)',
        'saffron-glow': '0 0 25px rgba(255, 184, 41, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
