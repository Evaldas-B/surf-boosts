/** @type {import('tailwindcss').Config} */
import { colors } from "./entrypoints/utils/theme"

export default {
  content: [
    "./assets/**/*.tsx",
    "./entrypoints/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
