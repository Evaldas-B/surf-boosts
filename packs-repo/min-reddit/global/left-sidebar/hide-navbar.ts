import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  css: await css`
    #left-sidebar-container,
    reddit-sidebar-nav,
    #hamburger-button-tooltip {
      display: none !important;
    }
  `,
})
