import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/watch*"],
  css: /* css */ `
  .ytp-endscreen-content,
  .ytp-button.ytp-endscreen-next,
  .ytp-button.ytp-endscreen-previous {
    display: none !important;
  }
  `,
})
