import { test } from "./fixtures"
import redH1Mock from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/boost/addBoost"
import expectToHaveColor from "./utils/expectElementToHaveColor"
import getBoost from "./utils/boost/getBoost"

test("Allows toggling boost on/off", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })

  let boost = await getBoost(page, extensionId, redH1)
  await boost.toggle("off")
  await boost.expectToBeToggled("off")

  // Check if css was removed
  await page.goto("https://example.com/")
  let h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")

  boost = await getBoost(page, extensionId, redH1)
  await boost.toggle("on")
  await boost.expectToBeToggled("on")

  // Check if css was added back
  await page.goto("https://example.com/")
  h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "red")
})
