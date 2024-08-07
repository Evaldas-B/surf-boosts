import { test } from "../fixtures"
import addBoost from "../utils/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import expectToHaveColor from "../utils/expectElementToHaveColor"
import updateBoostCss from "../utils/updateBoostCss"

test("Allows editing boost css", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })
  await updateBoostCss({
    page,
    boostName: "Red H1",
    css: "h1 { color: green; }",
  })

  // Check if update took effect
  await page.goto("https://example.com")
  const h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "green")
})
