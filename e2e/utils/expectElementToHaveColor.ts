import { expect, type Locator } from "@playwright/test"

const colors = {
  red: "rgb(255, 0, 0)",
  green: "rgb(0, 128, 0)",
  blue: "rgb(0, 0, 255)",
  pink: "rgb(255, 192, 203)",
  black: "rgb(0, 0, 0)",
  white: "rgb(255, 255, 255)",
  transparent: "rgba(0, 0, 0, 0)",
}

export default function expectToHaveColor(
  element: Locator,
  colorProperty: "background-color" | "color",
  color: keyof typeof colors,
) {
  return expect(element).toHaveCSS(colorProperty, colors[color])
}
