import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/search/*"],
  css: /* css */ `
  div[data-testid="search-results-sidebar"] {
    display: none;
  }
  `,
})
