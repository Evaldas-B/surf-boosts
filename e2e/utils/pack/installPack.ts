import type { Page } from "@playwright/test"

export default async function installPack({
  page,
  extensionId,
  packName,
}: {
  page: Page
  extensionId: string
  packName: string
}) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)
  await page.getByTitle("Install Boosts").click()

  const examplePack = page.locator(`li:has(h3:has-text("${packName}"))`)
  const installButton = examplePack.locator('button:has-text("Install")')

  await installButton.click()
}
