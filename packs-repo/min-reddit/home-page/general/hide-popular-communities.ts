import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/"],
  css: /* css */ `
  aside[aria-label="Popular Communities"] {
    display: none;
  }
  `,
})
