import { expect, test } from "../fixtures"
import addBoost from "../utils/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import updateBoostCategory from "../utils/updateBoostCategory"

test("Allows updating boost category", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  await addBoost({ page, extensionId, boost: redH1 })
  updateBoostCategory({ page, boostName: "Red H1", category: "New Category" })

  // Check if categories selector contains the new category
  const categoriesSelectValue = page.getByLabel("Category").first()
  await expect(categoriesSelectValue).toHaveValue("New Category")

  // Check boost category input has updated value
  await page.getByText("Red H1").click()
  const categoryInputValue = page.getByLabel("Category").first()
  await expect(categoryInputValue).toHaveValue("New Category")
})
