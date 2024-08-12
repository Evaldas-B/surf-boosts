import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "isuf96nut9jxmxeinlipt21m",
  name: "Hide posts",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/results?*"],
  category: "Search Page",
  group: "Results filtering",
  css: /* css */ `
ytd-shelf-renderer:has(ytd-post-renderer) {
  display: none;
}

ytd-secondary-search-container-renderer:has(ytd-universal-watch-card-renderer) {
  display: none;
}
  `,
}

export default boost
