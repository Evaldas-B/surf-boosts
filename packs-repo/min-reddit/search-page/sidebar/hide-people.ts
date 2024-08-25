import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/search/*"],
  css: await css`
    section[aria-label="Related people"] {
      display: none;
    }
  `,
})
