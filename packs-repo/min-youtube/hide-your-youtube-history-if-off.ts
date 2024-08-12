import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "eammwn3j8iqga3tcgo8evpw9",
  name: "Hide your youtube history is off",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/*"],
  category: "Global",
  group: "Annoyances",
  css: /* css */ `
  ytd-feed-nudge-renderer {
    display: none;
  }
  `,
}

export default boost
