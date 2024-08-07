import type { Page } from "@playwright/test"

export default async function updateBoostCategory({
  page,
  boostName,
  category,
}: {
  page: Page
  boostName: string
  category: string
}) {
  await page.getByText(boostName).click()
  const categoryInput = page.getByLabel("Category")

  await categoryInput.first().clear()
  await categoryInput.first().fill(category)

  await page.getByTitle("Save boost").first().click()
}
