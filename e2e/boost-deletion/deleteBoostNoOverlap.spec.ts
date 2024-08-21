import { expect, test } from "../fixtures"
import greenH1Mock from "../mocks/boosts/example.com/greenH1"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import addBoost from "../utils/boost/addBoost"
import getBoost from "../utils/boost/getBoost"

test("Other boosts are not deleted", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  const greenH1 = greenH1Mock()

  await addBoost({ page, extensionId, boost: redH1 })
  await addBoost({ page, extensionId, boost: greenH1 })

  const boost = await getBoost(page, extensionId, redH1)
  boost.delete()

  // Check if boost was deleted
  await expect(page.getByText("Red H1")).toHaveCount(0)

  // Check if other boost is still there
  await expect(page.getByText("Green H1")).toHaveCount(1)
})
