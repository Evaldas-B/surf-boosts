import { Locator, Page } from "@playwright/test"
import { expect } from "../../fixtures"

export type BoostIdentifiers = {
  pack: string
  category: string
  group: string
  name: string
}

export default async function getBoost(
  page: Page,
  extensionId: string,
  { pack, category, group, name }: BoostIdentifiers,
) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)

  await page.getByTitle("BoostPacks page").click()

  await page
    .locator(`div[data-testid="pack-${pack}"] div.cursor-pointer`)
    .click()

  await page.getByRole("textbox", { name: "Category" }).click()
  await page.getByText(category).click()

  const groupEl = page.locator(`div[data-testid="group-${group}"]`)

  const boost = groupEl.locator(`div[data-testid="boost-${name}"]`)

  return {
    locator: boost,
    toggle: toggleFactory(boost),
    delete: deleteFactory(page, boost),
    updateCategory: updateCategoryFactory(page, boost),
    updateGroup: updateGroupFactory(page, boost),
    updateCss: updateCssFactory(page, boost),
    updateJavascript: updateJavascriptFactory(page, boost),
    updateMatchPatterns: updateMatchPatternsFactory(page, boost),
    expectToBeToggled: expectBoostToBeToggleFactory(boost),
  }
}

function toggleFactory(boostLocator: Locator) {
  return async (toggle: "on" | "off") => {
    const desiredToggleState = toggle === "on" ? true : false
    const currentSwitchState = await boostLocator.locator("input").isChecked()
    if (currentSwitchState === desiredToggleState) return
    await boostLocator.locator("label").click()
  }
}

function deleteFactory(page: Page, boostLocator: Locator) {
  return async () => {
    await boostLocator.locator(".cursor-pointer").click()
    await page.getByTitle("Delete boost").click()
    await page.getByTitle("Confirm").click()
  }
}

function updateCategoryFactory(page: Page, boostLocator: Locator) {
  return async (category: string) => {
    await boostLocator.locator(".cursor-pointer").click()

    const categoryInput = page.getByLabel("Category")

    await categoryInput.first().clear()
    await categoryInput.first().fill(category)

    await page.getByTitle("Save boost").first().click()
  }
}

function updateGroupFactory(page: Page, boostLocator: Locator) {
  return async (group: string) => {
    await boostLocator.locator(".cursor-pointer").click()
    await page.getByLabel("Group").first().fill(group)
    await page.getByTitle("Save boost").first().click()
  }
}

function updateCssFactory(page: Page, boostLocator: Locator) {
  return async (css: string) => {
    await boostLocator.locator(".cursor-pointer").click()

    await page.getByTitle("Boost Css Tab").click()

    const cssInput = page.getByRole("textbox")
    await cssInput.clear()
    await cssInput.fill(css)
    await page.getByTitle("Save boost").click()
  }
}

function updateJavascriptFactory(page: Page, boostLocator: Locator) {
  return async (javascript: string) => {
    await boostLocator.locator(".cursor-pointer").click()

    await page.getByTitle("Boost JavaScript Tab").click()

    const jsInput = page.getByRole("textbox")
    await jsInput.clear()
    await jsInput.fill(javascript)
    await page.getByTitle("Save boost").click()
  }
}

function updateMatchPatternsFactory(page: Page, boostLocator: Locator) {
  return async (matchPatterns: string[]) => {
    await boostLocator.locator(".cursor-pointer").click()

    const matchPatternsInput = page.getByLabel("Match Patterns")

    // Delete old match patterns
    for (let i = 0; i < 5; i++) {
      await matchPatternsInput.first().press("Backspace")
    }

    // Add new match patterns
    await Promise.all(
      matchPatterns.map(async (matchPattern) => {
        await matchPatternsInput.first().fill(matchPattern)
        await matchPatternsInput.first().press("Enter")
      }),
    )

    await page.getByTitle("Save boost").first().click()
  }
}

function expectBoostToBeToggleFactory(boostLocator: Locator) {
  return async (toggleState: "on" | "off") => {
    const toggleBoolean = toggleState === "on" ? true : false
    const currentSwitchState = await boostLocator.locator("input").isChecked()
    expect(currentSwitchState).toBe(toggleBoolean)
  }
}
