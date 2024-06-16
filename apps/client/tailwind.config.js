/** @type {import('tailwindcss').Config}*/
import colors from "./src/constants/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
