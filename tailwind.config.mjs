/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';

const tailwindConfig = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      borderRadius: defaultTheme.borderRadius,
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [tailwindAnimate, typography],
};

export default tailwindConfig;
