import type { Page } from "@playwright/test"

export default async function toggleBoost({
  page,
  extensionId,
  toggle,
  boostIdentifiers,
}: {
  page: Page
  extensionId: string
  toggle: "on" | "off"
  boostIdentifiers: { name: string }
}) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)

  await page.waitForTimeout(500)

  const switchCheckbox = await page.locator(
    `[data-boost-name="${boostIdentifiers.name}"]`,
  )

  const desiredToggleState = toggle === "on" ? true : false

  // If switch is already in desired state do nothing
  const currentSwitchState = await switchCheckbox.isChecked()
  if (currentSwitchState === desiredToggleState) return
  // Switch input is hidden so label is clicked instead
  await switchCheckbox.locator("..").click()
}
