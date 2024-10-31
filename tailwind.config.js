/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#48a77f',
          50: '#f0f9f4',
          100: '#dbefe4',
          200: '#bae0cd',
          300: '#8ccab0',
          400: '#48a77f',
          500: '#3d8c6a',
          600: '#327154',
          700: '#2b5a45',
          800: '#25483a',
          900: '#1f3c31',
          950: '#0f1e19',
        },
      },
    },
  },
  plugins: [],
};