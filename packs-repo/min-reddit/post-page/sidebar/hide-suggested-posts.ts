import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  css: /* css */ `
  pdp-right-rail {
    display: none;
  }
  `,
})
