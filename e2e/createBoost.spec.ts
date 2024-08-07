import { test } from "./fixtures"
import redH1Mock from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/addBoost"
import expectToHaveColor from "./utils/expectElementToHaveColor"

test("Allows to create a boost and enables it by default", async ({
  page,
  extensionId,
}) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })

  await page.goto("https://example.com/")

  const h1 = page.locator("h1")

  await expectToHaveColor(h1, "color", "red")
  await expectToHaveColor(h1, "background-color", "black")
})
