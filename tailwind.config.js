/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,njk,md,11ty.js,liquid,js,ts}", // all your Eleventy templates
    "!./_site/**",
    "!./node_modules/**",
  ],
  theme: { extend: {} },
  plugins: [],
};
