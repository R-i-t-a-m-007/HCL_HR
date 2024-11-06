/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  
  ],important:"#root",
  theme: {
    // screens: {
    //   cardWidth: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    // colors: {
    //   deepblue: '#002060'
    // },
    extend: {
       colors: {
      'deepblue': '#002060',
      
    },
    boxShadow: {
      'custom-shadow': '4px 9px 10px 0px rgba(0,0,0,0.13)'
    }
  },
  plugins: [],
}
}
