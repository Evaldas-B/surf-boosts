import { Boost } from "@/utils/storage/boosts"
import type { Page } from "@playwright/test"

export default async function addBoost({
  page,
  extensionId,
  boost,
}: {
  page: Page
  extensionId: string
  boost: Boost
}) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)

  await page.getByTitle("Create Boost").click()

  await page.getByLabel("Boost ID").fill(boost.id)

  await page.getByLabel("isPublic").setChecked(boost.isPublic)

  if (boost.name) await page.getByLabel("Boost name").fill(boost.name)

  await page.getByLabel("Pack").first().fill(boost.pack)

  if (boost.category)
    await page.getByLabel("Category").first().fill(boost.category)

  if (boost.group) await page.getByLabel("Group").first().fill(boost.group)

  if (boost.matchPatterns.length) {
    const matchPatternsInput = await page.getByLabel("Match Patterns").first()
    for (const matchPattern of boost.matchPatterns) {
      await matchPatternsInput.fill(matchPattern)
      await matchPatternsInput.press("Enter")
    }
  }

  if (boost.css) {
    await page.getByTitle("Boost Css Tab").click()

    const cssInput = await page.getByRole("textbox")
    await cssInput.fill(boost.css)
  }

  if (boost.javascript) {
    await page.getByTitle("Boost JavaScript Tab").click()

    const jsInput = await page.getByRole("textbox")
    await jsInput.fill(boost.javascript)
  }

  await page.getByText("Save").last().click()
}
