import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/results?*"],
  css: /* css */ `
  ytd-radio-renderer,
  ytm-compact-radio-renderer {
      display: none;
  }
  `,
})
