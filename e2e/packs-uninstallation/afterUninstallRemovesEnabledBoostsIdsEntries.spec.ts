import { test } from "../fixtures"
import expectBoostToBeToggled from "../utils/expectBoostToBeToggled"
import installPack from "../utils/installPack"
import toggleBoost from "../utils/toggleBoost"
import uninstallPack from "../utils/uninstallPack"

test("After deletion removes enabled boost ids", async ({
  page,
  extensionId,
}) => {
  const packName = "Example"
  await installPack({ page, extensionId, packName })
  await page.getByTitle("BoostPacks page").click()

  await page.getByText("Example").click()

  await toggleBoost({
    page,
    extensionId,
    toggle: "on",
    boostIdentifiers: { name: "Red H1" },
  })

  await page.getByTitle("Install Boosts").click()

  await uninstallPack({ page, extensionId, packName })
  await installPack({ page, extensionId, packName })

  await page.getByTitle("BoostPacks page").click()
  await page.getByText("Example").click()

  await expectBoostToBeToggled({
    page,
    boostName: "Red H1",
    toggleState: false,
  })
})
