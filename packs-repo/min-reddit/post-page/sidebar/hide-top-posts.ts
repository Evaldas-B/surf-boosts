import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*"],
  css: /* css */ `
  div[srf-handle="top-posts-container"] {
    display: none;
  }
  `,
})
