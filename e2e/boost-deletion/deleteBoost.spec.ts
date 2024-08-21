import { expect, test } from "../fixtures"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import addBoost from "../utils/boost/addBoost"
import expectToHaveColor from "../utils/expectElementToHaveColor"
import getBoost from "../utils/boost/getBoost"

test("Allows deleting boost", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })

  const boost = await getBoost(page, extensionId, redH1)
  await boost.delete()

  await expect(page.getByText(redH1.name)).toHaveCount(0)

  await page.goto("https://example.com")
  const h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")
})
