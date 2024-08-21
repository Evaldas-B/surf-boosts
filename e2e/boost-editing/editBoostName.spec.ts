import { expect, test } from "../fixtures"
import addBoost from "../utils/boost/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"

test("Allows editing boost name", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })

  await page.getByText("Red H1").click()

  const boostNameInput = page.getByLabel("Boost name")

  boostNameInput.clear()
  boostNameInput.fill("Updated name")
  await page.getByTitle("Save boost").click()

  await expect(page.getByText("Updated name")).toBeVisible()
})
