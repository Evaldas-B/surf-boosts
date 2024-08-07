import type { Page } from "@playwright/test"

export default async function updateBoostCss({
  page,
  boostName,
  css,
}: {
  page: Page
  boostName: string
  css: string
}) {
  await page.getByText(boostName).click()

  await page.getByTitle("Boost Css Tab").click()

  const cssInput = page.getByRole("textbox")
  await cssInput.clear()
  await cssInput.fill(css)
  await page.getByTitle("Save boost").click()
}
