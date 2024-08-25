import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/watch*"],
  css: await css`
    .ytp-endscreen-content,
    .ytp-button.ytp-endscreen-next,
    .ytp-button.ytp-endscreen-previous {
      display: none !important;
    }
  `,
})
