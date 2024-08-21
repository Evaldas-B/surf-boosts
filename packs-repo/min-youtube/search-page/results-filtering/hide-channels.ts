import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/results?*"],
  css: /* css */ `
  ytd-shelf-renderer:has(ytd-post-renderer) {
    display: none;
  }
  
  ytd-secondary-search-container-renderer:has(ytd-universal-watch-card-renderer) {
    display: none;
  }
  `,
})
