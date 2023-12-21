/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  
    screens: {
      'ssm': '300px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
      fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'bebas': ['Bebas Neue', 'sans-serif'],
      'bebos': ['Raleway', 'sans-serif'],
      'roboto': ['Roboto Mono', 'monospace'],
      'poppins': ['Poppins', 'sans-serif'],
      'quicksand': ['Quicksand', 'sans-serif'],
      'bungee': ['Bungee', 'sans-serif'],
      'monoton': ['Monoton', 'sans-serif'],
      'orbitron': ['Orbitron', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
    },
 
  },
   extend: {
 
    },
  variants: {
    extend: {},
  },
  plugins: [],
};
