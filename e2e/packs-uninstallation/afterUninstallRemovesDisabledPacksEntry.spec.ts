import { test } from "../fixtures"
import expectPackToBeToggled from "../utils/pack/expectPackToBeToggled"
import installPack from "../utils/pack/installPack"
import togglePack from "../utils/pack/togglePack"
import uninstallPack from "../utils/pack/uninstallPack"

test("After deletion deletes record from disabled boosts", async ({
  page,
  extensionId,
}) => {
  const packName = "_example"
  await installPack({ page, extensionId, packName })
  await togglePack({ page, extensionId, packName, toggle: "off" })

  await uninstallPack({ page, extensionId, packName })
  await installPack({ page, extensionId, packName })

  await page.getByTitle("BoostPacks page").click()
  await expectPackToBeToggled({ page, packName, toggleState: true })

  await page.goto("https://example.com/")
})
