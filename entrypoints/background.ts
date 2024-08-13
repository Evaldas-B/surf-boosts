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

async function getBoostsToInject(tabUrl: string) {
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

async function injectJs(tabId: number, tabUrl: string) {
  const boostsToInject = await getBoostsToInject(tabUrl)
  const scripts = boostsToInject
    .map((b) => b.javascript)
    .filter((js) => js !== undefined)

  if (!scripts?.length) return
  injectScripts(tabId, scripts)
}

async function injectCss(tabId: number, tabUrl: string) {
  const boostsToInject = await getBoostsToInject(tabUrl)
  const styles = boostsToInject
    .map((b) => b.css)
    .filter((css) => css !== undefined)
    .join("\n")
    .trim()

  if (!styles?.length) return

  chrome.scripting.executeScript({
    target: { tabId },
    args: [styles],
    func: (styles) => {
      document.getElementById("surf-boosts")?.remove()
      const style = document.createElement("style")
      style.id = "surf-boosts"
      style.textContent = styles
      document.head.appendChild(style)
    },
  })
}

function runningOnBrowserPages(tabUrl: string) {
  const browserInternalSchemes = [
    "chrome://",
    "edge://",
    "about:", // Firefox
    "safari-resource://",
    "opera://",
    "vivaldi://",
  ]

  return browserInternalSchemes.some((scheme) => tabUrl.startsWith(scheme))
}

export default defineBackground(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.url) return
    if (runningOnBrowserPages(tab.url)) return

    if (changeInfo.status === "complete") {
      injectJs(tabId, tab.url)
      injectCss(tabId, tab.url)
    }
  })
})
