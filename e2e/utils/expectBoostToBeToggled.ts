import { expect, type Page } from "@playwright/test"

export default async function expectBoostToBeToggled({
  page,
  packName: boostName,
  toggleState,
}: {
  page: Page
  packName: string
  toggleState: boolean
}) {
  const switchCheckbox = page.locator(`[data-boost-name="${boostName}"]`)
  expect(await switchCheckbox.isChecked()).toBe(toggleState)
}
