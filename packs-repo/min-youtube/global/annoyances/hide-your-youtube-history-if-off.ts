import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/*"],
  css: await css`
    ytd-feed-nudge-renderer {
      display: none;
    }
  `,
})
