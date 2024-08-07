import { expect, test } from "../fixtures"
import addBoost from "../utils/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import updateBoostMatchPatterns from "../utils/updateBoostMatchPatterns"
import expectToHaveColor from "../utils/expectElementToHaveColor"

test("Allows editing boost match patterns", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })
  await updateBoostMatchPatterns({
    page,
    boostName: "Red H1",
    matchPatterns: ["https://example.net/*"],
  })

  await page.getByText("Red H1").click()
  await expect(page.getByText("https://example.net/*")).toBeVisible()

  // Check if the boost is applied to new match pattern
  await page.goto("https://example.net")
  let h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "red")
  await expectToHaveColor(h1, "background-color", "black")

  // Check if boost is no longer applied to old match pattern
  await page.goto("https://example.com")
  h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")
  await expectToHaveColor(h1, "background-color", "transparent")
})
