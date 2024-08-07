import { test } from "./fixtures"
import redH1Mock from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/addBoost"
import expectBoostToBeToggled from "./utils/expectBoostToBeToggled"
import expectToHaveColor from "./utils/expectElementToHaveColor"
import toggleBoost from "./utils/toggleBoost"

test("Allows toggling boost on/off", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })

  await toggleBoost({
    page,
    extensionId,
    toggle: "off",
    boostIdentifiers: { name: redH1.name },
  })

  expectBoostToBeToggled({ page, packName: redH1.name, toggleState: false })

  // Check if css was removed
  await page.goto("https://example.com/")
  let h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")

  await toggleBoost({
    page,
    extensionId,
    toggle: "on",
    boostIdentifiers: { name: redH1.name },
  })

  // Check if css was added back
  await page.goto("https://example.com/")
  h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "red")
})
