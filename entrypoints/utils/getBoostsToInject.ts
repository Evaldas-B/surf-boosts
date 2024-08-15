import storage from "@/utils/storage/storage"
import { matchPattern } from "browser-extension-url-match"

export default async function getBoostsToInject(tabUrl: string) {
  const boosts = await storage.BOOSTS.getValue()
  const enabledBoostsIds = await storage.ENABLED_BOOSTS_IDS.getValue()
  const disabledPacks = await storage.DISABLED_PACKS.getValue()

  const boostsToInject = boosts.filter(
    (b) =>
      enabledBoostsIds.includes(b.id) &&
      matchPattern(b.matchPatterns).assertValid().match(tabUrl) &&
      !disabledPacks.includes(b.pack),
  )

  return boostsToInject
}
