import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "cdqf12f4fvuzxjzen0oi1yg1",
  name: "Hide comments",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/watch*"],
  category: "Video Page",
  group: "Comments",
  css: /* css */ `
  ytd-comments {
    display: none;
  }
  `,
}

export default boost
