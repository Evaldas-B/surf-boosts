import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url, true)

export default createBoost({
  matchPatterns: ["*://*.reddit.com/r/*/comments/*"],
  javascript: `
  const h2 = document.querySelectorAll("h2");
  const topPostsH2 = Array.from(h2).find(element => element.textContent.includes("Top Posts"));
  topPostsH2.parentNode.setAttribute("srf-handle", "top-posts-container");
  `,
})
