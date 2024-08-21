import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/*"],
  css: /* css */ `
  ytd-feed-nudge-renderer {
    display: none;
  }
  `,
})
