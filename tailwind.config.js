/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define colors for light mode
        light: {
          black: '#000',
          lightblack: '#ccc',
        },
        // Define colors for dark mode
        dark: {
          black: '#fff',
          lightblack: '#eee',
        },
      },
    },
  },
  plugins: [],
}