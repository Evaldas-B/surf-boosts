import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  css: /* css */ `
  div[id="comment-tree-content-anchor-1ez9a2d"] {
    display: none;
  }

  shreddit-comments-sort-dropdown[target="comment-tree-content-anchor-1ez9a2d"] {
    display: none;
  }
  `,
})
