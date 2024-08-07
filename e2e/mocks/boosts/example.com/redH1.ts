import { Boost } from "@/utils/storage/boosts"
import { createId } from "@paralleldrive/cuid2"

const boost = (): Boost => ({
  id: createId(),
  isPublic: false,
  name: "Red H1",
  matchPatterns: ["https://example.com/*"],
  pack: "Example",
  category: "Index Page",
  group: "Header styling",
  css: /* css */ `
    h1 {
      color: red;
    }
  `,
  javascript: `const h1 = document.querySelector("h1")
h1.style.backgroundColor = "black"`,
})

export default boost
