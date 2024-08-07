import storage from "@/utils/storage/storage"
import { matchPattern } from "browser-extension-url-match"

export default defineContentScript({
  matches: ["<all_urls>"],

  async main() {
    injectCss()
    storage.BOOSTS.watch(injectCss)
    storage.ENABLED_BOOSTS_IDS.watch(injectCss)
    storage.DISABLED_PACKS.watch(injectCss)
  },
})

async function injectCss() {
  const boosts = await storage.BOOSTS.getValue()
  const enabledBoostsIds = await storage.ENABLED_BOOSTS_IDS.getValue()
  const disabledPacks = await storage.DISABLED_PACKS.getValue()
  const currentUrl = window.location.href

  const css = boosts
    .filter(
      (b) =>
        enabledBoostsIds.includes(b.id) &&
        matchPattern(b.matchPatterns).assertValid().match(currentUrl) &&
        !disabledPacks.includes(b.pack),
    )
    .map((boost) => boost.css)
    .join("\n")

  document.querySelector("#surf-boosts-css")?.remove()

  const style = document.createElement("style")
  style.id = "surf-boosts-css"
  style.innerHTML = css
  document.head.appendChild(style)
}
