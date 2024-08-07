import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "o8n8iuyf4emdx6mqhfpz1rsa",
  name: "Hide video page feed",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/watch*"],
  category: "Video Page",
  group: "Feed",
  css: /* css */ `
    ytd-watch-next-secondary-results-renderer {
        display: none;
    }
  `,
}

export default boost
