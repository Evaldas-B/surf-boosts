import { mapValues } from "es-toolkit"

export const colors = {
  primary: {
    50: "#ebf0ff",
    100: "#d6ddfb",
    200: "#adb7f0",
    300: "#8090e3",
    400: "#5b6eda",
    500: "#4358d4",
    600: "#364ed2",
    700: "#273fbb",
    800: "#1f37a8",
    900: "#132f95",
  },
  secondary: {
    50: "#e8f2ff",
    100: "#d3e2fd",
    200: "#a8c1f4",
    300: "#799fea",
    400: "#5282e3",
    500: "#3970de",
    600: "#2967dd",
    700: "#1a56c5",
    800: "#0e4db2",
    900: "#00429e",
  },
  accent: {
    50: "#e2fff7",
    100: "#d1faed",
    200: "#a6f1dc",
    300: "#7ae8c9",
    400: "#54e1b8",
    500: "#3bdcae",
    600: "#28daa8",
    700: "#13c192",
    800: "#00ac81",
    900: "#00956e",
  },
  base: {
    50: "#5F626D",
    100: "#555862",
    200: "#4C4E57",
    300: "#42444C",
    400: "#393B41",
    500: "#2F3137",
    600: "#212226",
    700: "#1C1D21",
    800: "#131416",
    900: "#090A0B",
  },
}

export const mantineColors = mapValues(colors, (value) => {
  const colorValues = Object.values(value)
  if (isValidColorArray(colorValues)) {
    return colorValues
  }
  throw new Error("Invalid color array")
})

function isValidColorArray(
  arr: unknown,
): arr is [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] {
  return (
    Array.isArray(arr) &&
    arr.length === 10 &&
    arr.every((item) => typeof item === "string")
  )
}
