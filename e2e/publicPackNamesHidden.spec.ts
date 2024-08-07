import { expect, test } from "./fixtures"
import redH1 from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/addBoost"

test("Public pack names do not appear during boost creation", async ({
  page,
  extensionId,
}) => {
  const publicBoost = redH1()
  publicBoost.isPublic = true
  publicBoost.pack = "Public Pack"
  await addBoost({ page, extensionId, boost: publicBoost })

  const privateBoost = redH1()
  privateBoost.isPublic = false
  privateBoost.pack = "Private Pack"
  await addBoost({ page, extensionId, boost: privateBoost })

  // Try to create a new boost and check that the public name is not visible
  await page.getByTitle("Create Boost").click()

  await page.getByLabel("Pack").first().click()

  const publicPackOption = page.locator('[value="Public Pack"]')
  await expect(publicPackOption).not.toBeVisible()

  const privatePackOption = page.locator('[value="Private Pack"]')
  await expect(privatePackOption).toBeVisible()
})
