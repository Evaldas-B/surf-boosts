import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/watch*"],
  css: /* css */ `
  ytd-comments {
    display: none;
  }
  `,
})
