import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  css: /* css */ `
  #left-sidebar-container, reddit-sidebar-nav, #hamburger-button-tooltip {
    display: none !important;
  }
  `,
})
