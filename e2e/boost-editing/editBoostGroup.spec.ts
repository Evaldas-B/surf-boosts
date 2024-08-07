import { expect, test } from "../fixtures"
import addBoost from "../utils/addBoost"
import redH1Mock from "../mocks/boosts/example.com/redH1"
import greenH1Mock from "../mocks/boosts/example.com/greenH1"
import updateBoostGroup from "../utils/updateBoostGroup"

test("Allows to edit boost group", async ({ page, extensionId }) => {
  const redH1 = redH1Mock()
  redH1.group = "Group 1"
  await addBoost({ page, extensionId, boost: redH1 })

  const greenH1 = greenH1Mock()
  greenH1.group = "Group 1"
  await addBoost({ page, extensionId, boost: greenH1 })

  let groupContainers = page.getByTestId("group")

  // Checks for one group with 2 boosts
  expect(groupContainers).toHaveCount(1)
  const groupHeader = groupContainers.first().locator("h3")
  await expect(groupHeader).toHaveText("Group 1")

  const boosts = groupContainers.locator("h4")
  expect(await boosts.count()).toBe(2)

  await updateBoostGroup({ page, boostName: "Red H1", group: "Group 2" })

  // Check if additional group was added
  groupContainers = page.getByTestId("group")
  await expect(groupContainers).toHaveCount(2)
})
