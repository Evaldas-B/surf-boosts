import { expect, test } from "../fixtures"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import addBoost from "../utils/addBoost"
import deleteBoost from "../utils/deleteBoost"
import expectToHaveColor from "../utils/expectElementToHaveColor"

test("Allows deleting boost", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })

  await deleteBoost({ page, boostName: "Red H1" })
  await expect(page.getByText("Red H1")).toHaveCount(0)

  await page.goto("https://example.com")

  const h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")
})
