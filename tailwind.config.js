/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': 'rgb(255 86 23)',
        'hover-orange': 'rgb(252 107 53)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

