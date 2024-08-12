import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "wiehduip7tux25wvx0a6zxeh",
  name: "Hide playlists",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/results?*"],
  category: "Search Page",
  group: "Results filtering",
  css: /* css */ `
ytd-playlist-renderer {
    display: none;
}
  `,
}

export default boost
