import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  css: /* css */ `
    nav div.flex.items-center.justify-center:has(#expand-user-drawer-button) {
        display: none;
    } 
    `,
})
