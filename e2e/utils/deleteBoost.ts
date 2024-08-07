import type { Page } from "@playwright/test"

export default async function deleteBoost({
  page,
  boostName,
}: {
  page: Page
  boostName: string
}) {
  await page.getByText(boostName).click()
  await page.getByTitle("Delete boost").click()
  await page.getByTitle("Confirm").click()
}
