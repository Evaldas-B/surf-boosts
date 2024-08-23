import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/search/*"],
  css: /* css */ `
  section[aria-label="Related communities"] {
    display: none;
  }
  `,
})
