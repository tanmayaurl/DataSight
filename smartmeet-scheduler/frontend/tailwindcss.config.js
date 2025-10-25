/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {colors: {
        primary: "#2563EB", // elegant blue accent
        secondary: "#1E293B", // deep grayish navy
        accent: "#E2E8F0", // soft gray
        bgLight: "#F8FAFC", // off-white dashboard background
      },},
    },
    plugins: [],
  };
  