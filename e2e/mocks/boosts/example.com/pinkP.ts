import { Boost } from "@/utils/storage/boosts"
import { createId } from "@paralleldrive/cuid2"

const boost = (): Boost => ({
  id: createId(),
  isPublic: false,
  isSetup: false,
  name: "Pink P",
  matchPatterns: ["https://example.com/*"],
  pack: "Example",
  category: "Index Page",
  group: "Paragraph styling",
  css: /* css */ `
    p {
      color: pink;
    }
  `,
  javascript: `const p = document.querySelector("p")
p.style.backgroundColor = "black"`,
})

export default boost
