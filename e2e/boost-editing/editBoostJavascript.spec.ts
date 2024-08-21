import { test } from "../fixtures"
import addBoost from "../utils/boost/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import expectToHaveColor from "../utils/expectElementToHaveColor"
import getBoost from "../utils/boost/getBoost"

test("Allows updating boost javascript", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })
  const boost = await getBoost(page, extensionId, redH1)
  await boost.updateJavascript(
    "document.querySelector('h1').style.backgroundColor = 'blue';",
  )

  await page.goto("https://example.com")
  const h1 = page.locator("h1")
  await expectToHaveColor(h1, "background-color", "blue")
})
