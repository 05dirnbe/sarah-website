/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md,html,txt,webmanifest,ico}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

