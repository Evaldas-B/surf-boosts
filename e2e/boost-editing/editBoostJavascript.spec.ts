import { test } from "../fixtures"
import addBoost from "../utils/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import expectToHaveColor from "../utils/expectElementToHaveColor"
import updateBoostJavascript from "../utils/updateBoostJavascript"

test("Allows updating boost javascript", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })
  await updateBoostJavascript({
    page,
    boostName: "Red H1",
    javascript: "document.querySelector('h1').style.backgroundColor = 'blue';",
  })

  // Check if update took effect
  await page.goto("https://example.com")
  const h1 = page.locator("h1")
  await expectToHaveColor(h1, "background-color", "blue")
})
