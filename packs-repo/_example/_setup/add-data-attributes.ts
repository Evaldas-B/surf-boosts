import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url, true)

export default createBoost({
  matchPatterns: ["*://*.example.com/*"],
  css: await css`
    a {
      color: orange;
    }
  `,
})
