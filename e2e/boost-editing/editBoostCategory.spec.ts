import { expect, test } from "../fixtures"
import addBoost from "../utils/boost/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import getBoost from "../utils/boost/getBoost"

test("Allows updating boost category", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })

  const boost = await getBoost(page, extensionId, redH1)
  await boost.updateCategory("New Category")

  // Check if categories selector contains the new category
  const categoriesSelectValue = page.getByLabel("Category").first()
  await expect(categoriesSelectValue).toHaveValue("New Category")

  // Check boost category input has updated value
  await page.getByText("Red H1").click()
  const categoryInputValue = page.getByLabel("Category").first()
  await expect(categoryInputValue).toHaveValue("New Category")
})
