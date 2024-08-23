import storage from "@/utils/storage/storage"
import { matchPattern } from "browser-extension-url-match"
import { partition } from "es-toolkit"

export default async function getBoostsToInject(tabUrl: string) {
  const boosts = await storage.BOOSTS.getValue()
  const enabledBoostsIds = await storage.ENABLED_BOOSTS_IDS.getValue()
  const disabledPacks = await storage.DISABLED_PACKS.getValue()

  const boostsFromEnabledPacks = boosts.filter(
    (b) =>
      !disabledPacks.includes(b.pack) &&
      matchPattern(b.matchPatterns).assertValid().match(tabUrl),
  )
  const [setupBoosts, regularBoosts] = partition(
    boostsFromEnabledPacks,
    (b) => b.isSetup,
  )

  const enabledRegularBoosts = regularBoosts.filter((b) =>
    enabledBoostsIds.includes(b.id),
  )

  const boostsToInject = [...setupBoosts, ...enabledRegularBoosts]

  return boostsToInject
}
