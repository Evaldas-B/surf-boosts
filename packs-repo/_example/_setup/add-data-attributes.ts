import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url, true)

export default createBoost({
  matchPatterns: ["*://*.example.com/*"],
  css: /* css */ `
    a {
      color: orange;
    }
  `,
})
