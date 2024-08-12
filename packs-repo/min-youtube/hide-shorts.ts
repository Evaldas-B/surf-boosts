import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "ug0pxslgzo8xsas7rtydp8nd",
  name: "Hide shorts",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/*"],
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

/* Hide shorts button in navbar */
ytd-mini-guide-entry-renderer a[title="Shorts"],
ytd-guide-entry-renderer a[title="Shorts"] {
    display: none;
}
  `,
}

export default boost
