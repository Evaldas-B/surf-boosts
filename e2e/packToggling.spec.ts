import { test } from "./fixtures"
import pinkPMock from "./mocks/boosts/example.com/pinkP"
import redH1Mock from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/boost/addBoost"
import expectToHaveColor from "./utils/expectElementToHaveColor"
import expectPackToBeToggled from "./utils/pack/expectPackToBeToggled"
import togglePack from "./utils/pack/togglePack"

test("Allows toggling pack on/off", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })

  const pinkP = pinkPMock()
  await addBoost({ page, extensionId, boost: pinkP })

  await page.getByTitle("BoostPacks page").click()

  // Pack should be enabled by default
  expectPackToBeToggled({ page, packName: redH1.pack, toggleState: true })

  // Confirm that the css was applied
  await page.goto("https://example.com/")

  let h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "red")

  let p = page.locator("p").first()
  await expectToHaveColor(p, "color", "pink")

  await togglePack({ page, extensionId, toggle: "off", packName: redH1.pack })

  // Confirm that the css was removed
  await page.goto("https://example.com/")

  h1 = page.locator("h1")
  await expectToHaveColor(h1, "color", "black")

  p = page.locator("p").first()
  await expectToHaveColor(p, "color", "black")
})
