import { expect, test } from "./fixtures"
import greenH1 from "./mocks/boosts/example.com/greenH1"
import redH1 from "./mocks/boosts/example.com/redH1"
import addBoost from "./utils/boost/addBoost"

test("Allows to filter by category", async ({ page, extensionId }) => {
  const boost1 = redH1()
  boost1.category = "Category1"
  await addBoost({ page, extensionId, boost: boost1 })

  const boost2 = greenH1()
  boost2.category = "Category2"
  await addBoost({ page, extensionId, boost: boost2 })

  // Category1 should be selected by default and redH1 boost should be visible
  const categorySelector = page.getByLabel("Category").first()
  await expect(categorySelector).toHaveValue("Category1")

  let boost1Link = page.getByTestId(boost1.id)
  await expect(boost1Link).toBeVisible()

  let boost2Link = page.getByTestId(boost2.id)
  await expect(boost2Link).not.toBeVisible()

  await page.getByLabel("Category").first().click()
  await page.getByRole("option", { name: "Category2" }).click()

  boost1Link = page.getByTestId(boost1.id)
  await expect(boost1Link).not.toBeVisible()

  boost2Link = page.getByTestId(boost2.id)
  await expect(boost2Link).toBeVisible()
})
