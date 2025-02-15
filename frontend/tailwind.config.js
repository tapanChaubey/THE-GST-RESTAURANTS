/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tapan: "#ff0000"
      },
      fontFamily: {
        poppins: "Poppins, sans-serif"
      }
    },
  },
  plugins: [],
}

