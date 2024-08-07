import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "kx9qg6k2dxukb8pm7u3bgcu8",
  name: "Red H1",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.example.com/*"],
  category: "Index Page",
  group: "Header styling",
  css: /* css */ `
    h1 {
      color: red;
    }
  `,
}

export default boost
