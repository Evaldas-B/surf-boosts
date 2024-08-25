import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/search/*"],
  css: await css`
    div[data-testid="search-results-sidebar"] {
      display: none;
    }
  `,
})
