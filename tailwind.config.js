/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "os-purple": "#7152F3",
      },
    },
    fontFamily: {
      lexend: ["Lexend Deca", "sans-serif"],
      poppins: ['Poppins', 'sans-serif']
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
