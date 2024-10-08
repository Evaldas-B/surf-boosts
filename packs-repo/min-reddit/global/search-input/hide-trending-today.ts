import createBoostFactory from "@/packs-builder/createBoostFactory"
import { js } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  javascript: await js`
  const search = document.querySelector("reddit-search-large")

  const hideElements = () => {
    search.shadowRoot.querySelector("#reddit-trending-searches-partial-container")?.style.setProperty("display", "none")
    search.shadowRoot.querySelector('svg[icon-name="rising-outline"]')?.parentElement?.style.setProperty("display", "none")
  }

  hideElements()

  new MutationObserver(hideElements).observe(search.shadowRoot, { childList: true, subtree: true })
  `,
})
