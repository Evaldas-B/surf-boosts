import prettier from "prettier"
export const css = (strings: TemplateStringsArray, ...values: unknown[]) =>
  prettier.format(
    strings.reduce((acc, str, i) => acc + str + (values[i] || ""), ""),
    { parser: "css" },
  )

export const js = (strings: TemplateStringsArray, ...values: unknown[]) =>
  prettier.format(
    strings.reduce((acc, str, i) => acc + str + (values[i] || ""), ""),
    { parser: "typescript" },
  )
