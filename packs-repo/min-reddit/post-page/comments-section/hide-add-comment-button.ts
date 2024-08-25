import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  css: await css`
    faceplate-tracker[source="shreddit_comment_count_button"] {
      display: none;
    }
  `,
})
