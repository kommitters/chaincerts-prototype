/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif']
      },
      colors: {
        'hight-pink': '#E1429B',
        'hight-purple': '#6C3CEA',
        'slave-dark': '#120D1E',
        'low-gray': 'rgba(255, 255, 255, 0.15)',
        'hight-red': '#FF025D'
      }
    }
  },
  plugins: [require('daisyui')]
};
