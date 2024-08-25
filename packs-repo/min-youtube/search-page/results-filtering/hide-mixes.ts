import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/results?*"],
  css: await css`
    ytd-radio-renderer,
    ytm-compact-radio-renderer {
      display: none;
    }
  `,
})
