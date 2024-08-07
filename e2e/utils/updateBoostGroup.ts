import type { Page } from "@playwright/test"

export default async function updateBoostGroup({
  page,
  boostName,
  group,
}: {
  page: Page
  boostName: string
  group: string
}) {
  await page.getByText(boostName).click()
  await page.getByLabel("Group").first().fill(group)
  await page.getByTitle("Save boost").first().click()
}
