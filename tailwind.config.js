/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Màu xanh đậm
        secondary: "#9333EA", // Màu tím
        background: "#111827", // Màu nền tối
      },
    },
  },
  plugins: [],
};
