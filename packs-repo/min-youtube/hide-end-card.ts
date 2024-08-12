import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "f9si9qwh81fq3iefk47rhv07",
  name: "Hide end cards",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/watch*"],
  category: "Video Page",
  group: "Player",
  css: /* css */ `
  .ytp-endscreen-content,
  .ytp-button.ytp-endscreen-next,
  .ytp-button.ytp-endscreen-previous {
    display: none !important;
  }
  `,
}

export default boost
