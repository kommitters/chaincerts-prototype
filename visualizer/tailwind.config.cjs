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
      colors: {
        'hight-pink': '#E1429B',
        'hight-purple': '#6C3CEA'
      }
    }
  },
  plugins: [require('daisyui')]
};
