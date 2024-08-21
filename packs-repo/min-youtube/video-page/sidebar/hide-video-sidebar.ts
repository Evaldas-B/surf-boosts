import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)
export default createBoost({
  matchPatterns: ["*://*.youtube.com/watch*"],
  css: /* css */ `
  #secondary.ytd-watch-flexy {
    display: none;
  }
  /* Center video when sidebar is hidden */
  ytd-watch-flexy[flexy][is-two-columns_]:not([fullscreen]):not([theater]) {
    --ytd-watch-flexy-max-player-width: calc(
      var(--ytd-watch-flexy-chat-max-height) * var(--ytd-watch-flexy-width-ratio) /
        var(--ytd-watch-flexy-height-ratio)
    ) !important;
  }

  /* Mobile */
  ytd-item-section-renderer {
    display: none;
  }
  `,
})
