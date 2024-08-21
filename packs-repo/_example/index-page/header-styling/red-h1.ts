import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.example.com/*"],
  css: /* css */ `
    h1 {
      color: red;
    }
  `,
})
