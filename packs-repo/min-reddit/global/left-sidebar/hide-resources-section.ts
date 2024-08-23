import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  css: /* css */ `
  details:has(> summary[aria-controls="RESOURCES"]) {
    display: none;
  }
  `,
})
