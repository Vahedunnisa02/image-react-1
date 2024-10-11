/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tell Tailwind to scan these file types in the src folder
  ],
  theme: {
    extend: {}, // You can customize your theme here
  },
  plugins: [], // If you want to add plugins in the future
};
