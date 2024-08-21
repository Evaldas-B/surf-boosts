import { test } from "../fixtures"
import getBoost from "../utils/boost/getBoost"
import installPack from "../utils/pack/installPack"
import uninstallPack from "../utils/pack/uninstallPack"

test("After deletion removes enabled boost ids", async ({
  page,
  extensionId,
}) => {
  const packName = "_example"
  await installPack({ page, extensionId, packName })

  let boost = await getBoost(page, extensionId, {
    pack: packName,
    category: "Index Page",
    group: "Header styling",
    name: "Red h1",
  })

  await boost.toggle("on")

  await page.getByTitle("Install Boosts").click()

  await uninstallPack({ page, extensionId, packName })
  await installPack({ page, extensionId, packName })

  boost = await getBoost(page, extensionId, {
    pack: packName,
    category: "Index Page",
    group: "Header styling",
    name: "Red h1",
  })

  await boost.expectToBeToggled("off")
})
