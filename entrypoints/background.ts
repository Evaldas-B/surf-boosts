import { intersection } from "lodash-es"
import { getActiveTab, runningOnBrowserPages } from "./utils/browserUtils"
import injectCss from "./utils/injectCss"
import injectJs from "./utils/injectJs"
import getBoostsToInject from "./utils/getBoostsToInject"

async function injectBoosts(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab,
) {
  if (!tab.url) return
  if (runningOnBrowserPages(tab.url)) return
  if (changeInfo.status !== "complete") return

  const boostsToInject = await getBoostsToInject(tab.url)
  injectJs(tabId, boostsToInject)
  injectCss(tabId, boostsToInject)
}

async function reInjectCSSOnStorageChange(
  changed: Record<string, chrome.storage.StorageChange>,
) {
  const tab = await getActiveTab()
  if (!tab?.id || !tab.url) return

  const keysTriggeringReInjection = [
    "ENABLED_BOOSTS_IDS",
    "DISABLED_PACKS",
    "BOOSTS",
  ]
  const affectedStorageKeys = Object.keys(changed)
  if (!intersection(keysTriggeringReInjection, affectedStorageKeys).length)
    return

  const boostsToInject = await getBoostsToInject(tab.url)
  injectCss(tab.id, boostsToInject)
}

export default defineBackground(() => {
  chrome.tabs.onUpdated.addListener(injectBoosts)
  chrome.storage.local.onChanged.addListener(reInjectCSSOnStorageChange)
})
