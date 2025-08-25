/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{html,js}",     // catch all HTML + JS in subfolders (assets/, netlify/, etc.)
  ],
  theme: { extend: {} },
  plugins: [],
};
