import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*"],
  css: await css`
    div[srf-handle="top-posts-container"] {
      display: none;
    }
  `,
})
