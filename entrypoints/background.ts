import { Boost } from "@/utils/storage/boosts"
import storage from "@@/utils/storage/storage"
import { matchPattern } from "browser-extension-url-match"

function injectScripts(tabId: number, scripts: string[]) {
  for (const javascript of scripts) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      world: "MAIN",
      args: [javascript],
      func: (javascript) => {
        const func = new Function(javascript)
        func()
      },
    })
  }
}

async function injectJs(tabId: number, tabUrl: string) {
  const boosts = await storage.BOOSTS.getValue()
  const enabledBoostsIds = await storage.ENABLED_BOOSTS_IDS.getValue()
  const disabledPacks = await storage.DISABLED_PACKS.getValue()

  const scripts = boosts
    .filter(
      (b): b is Omit<Boost, "javascript"> & { javascript: string } =>
        typeof b.javascript === "string" &&
        enabledBoostsIds.includes(b.id) &&
        matchPattern(b.matchPatterns).assertValid().match(tabUrl) &&
        !disabledPacks.includes(b.pack),
    )
    .map((b) => b.javascript)

  if (!scripts?.length) return
  injectScripts(tabId, scripts)
}

export default defineBackground(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) injectJs(tabId, tab.url)
  })
})
