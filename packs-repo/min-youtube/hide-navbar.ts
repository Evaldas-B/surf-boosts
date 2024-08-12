import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "isdk66938exn058e6hiwbpb7",
  name: "Hide navbar",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.youtube.com/*"],
  category: "Global",
  group: "Navbar",
  css: /* css */ `
  ytd-mini-guide-renderer,
  #guide-content,
  #guide-button {
    display: none !important;
  }
  `,
}

export default boost
