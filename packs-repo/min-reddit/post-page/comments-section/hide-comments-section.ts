import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  css: await css`
    div[id="comment-tree-content-anchor-1ez9a2d"] {
      display: none;
    }

    shreddit-comments-sort-dropdown[target="comment-tree-content-anchor-1ez9a2d"] {
      display: none;
    }
  `,
})
