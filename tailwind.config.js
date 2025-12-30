/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#DAA520',
        'orange': '#CC5500',
      },
    },
  },
  plugins: [],
}

