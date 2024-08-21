import { expect, type Page } from "@playwright/test"

export default async function expectPackToBeToggled({
  page,
  packName,
  toggleState,
}: {
  page: Page
  packName: string
  toggleState: boolean
}) {
  const switchCheckbox = page.locator(`[data-pack-name="${packName}"]`)
  expect(await switchCheckbox.isChecked()).toBe(toggleState)
}
