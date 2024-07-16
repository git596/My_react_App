/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       spacing: {
//         ...require('tailwindcss/defaultTheme').spacing,
//         '10.5': '2.625rem', // Example of adding a custom value
//         // Add more custom spacing values as needed
//       },
//     },
//   },
//   plugins: [],
// }
