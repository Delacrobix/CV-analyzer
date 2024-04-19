/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  mode: "jit",
  purge: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [nextui()],
};
