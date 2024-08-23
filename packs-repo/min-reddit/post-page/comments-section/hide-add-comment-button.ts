import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  css: /* css */ `
  faceplate-tracker[source="shreddit_comment_count_button"] {
    display: none;
  }
  `,
})
