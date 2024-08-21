import createBoostFactory from "@/packs-builder/createBoostFactory"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.youtube.com/*"],
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
})
