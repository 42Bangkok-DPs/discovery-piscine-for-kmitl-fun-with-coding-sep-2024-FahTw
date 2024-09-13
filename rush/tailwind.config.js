/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        '3xl': '60px',  // เพิ่มขนาดที่คุณต้องการที่นี่
      },
    },
  },
  plugins: [],
}
