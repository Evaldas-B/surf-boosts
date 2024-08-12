import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "w7rgdjhf1ssx8y77b98jmteo",
  name: "Hide video sidebar",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/watch*"],
  category: "Video Page",
  group: "Sidebar",
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
}

export default boost
