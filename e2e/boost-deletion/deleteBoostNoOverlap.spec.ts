import { expect, test } from "../fixtures"
import greenH1Mock from "../mocks/boosts/example.com/greenH1"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import addBoost from "../utils/addBoost"
import deleteBoost from "../utils/deleteBoost"

test("Other boosts are not deleted", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  const greenH1 = greenH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })
  await addBoost({ page, extensionId, boost: greenH1 })

  await deleteBoost({ page, boostName: "Red H1" })

  // Check if boost was deleted
  await expect(page.getByText("Red H1")).toHaveCount(0)

  // Check if other boost is still there
  await expect(page.getByText("Green H1")).toHaveCount(1)
})
