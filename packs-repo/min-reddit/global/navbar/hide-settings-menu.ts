import createBoostFactory from "@/packs-builder/createBoostFactory"
import { css } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/*"],
  css: await css`
    nav div.flex.items-center.justify-center:has(#expand-user-drawer-button) {
      display: none;
    }
  `,
})
