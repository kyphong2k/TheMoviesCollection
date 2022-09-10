"use strict";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'phone': '320px',
      'ipad': '768px',
      'laptop': '1024px',
      'large': '1440px'
    },
    extend: {
      colors: {
        'blue': '#1fb6ff',
        'gray-light': '#d3dce6'
      }
    }
  },
  plugins: []
};