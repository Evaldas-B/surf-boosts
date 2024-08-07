import type { Page } from "@playwright/test"

export default async function updateBoostJavascript({
  page,
  boostName,
  javascript,
}: {
  page: Page
  boostName: string
  javascript: string
}) {
  await page.getByText(boostName).click()

  // Update javascript
  await page.getByTitle("Boost JavaScript Tab").click()

  const jsInput = page.getByRole("textbox")
  await jsInput.clear()
  await jsInput.fill(javascript)
  await page.getByTitle("Save boost").click()
}
