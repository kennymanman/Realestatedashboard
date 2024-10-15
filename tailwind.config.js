/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        hel: ['NeueHelveticaBQMedium', 'sans-serif'],
       
      },

      colors: {
        "base-color": "#EBEBEB",
        "subtext-color": "#868686",
      }


    },
  },
  plugins: [],
}

