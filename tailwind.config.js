/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this is correct
  ],
  theme: {
    extend: {
      colors: {
        'darkblue-darker': '#0a1128', // Replace this with your desired color code
      },
    },
  },
  plugins: [],
};

