import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/"],
  css: /* css */ `
  community-highlight-carousel {
    display: none !important;
  }
  `,
})
