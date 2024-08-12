import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "yclsx5tjn97acnysxfmvfxv9",
  name: "Hide mixes",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/results?*"],
  category: "Search Page",
  group: "Results filtering",
  css: /* css */ `
ytd-radio-renderer,
ytm-compact-radio-renderer {
    display: none;
}
  `,
}

export default boost
