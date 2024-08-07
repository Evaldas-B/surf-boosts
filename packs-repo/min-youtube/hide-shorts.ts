import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "ug0pxslgzo8xsas7rtydp8nd",
  name: "Hide shorts",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/results?*"],
  category: "Search Page",
  group: "Results filtering",
  css: /* css */ `
    /* Hide Shorts sections */
    ytd-reel-shelf-renderer {
        display: none;
    }
    
    /* Hide individual shorts*/
    ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]) {
        display: none;
    }
  `,
}

export default boost
