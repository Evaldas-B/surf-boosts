import { Boost } from "@/utils/storage/boosts"

export default async function injectCss(
  tabId: number,
  boostsToInject: Boost[],
) {
  const styles = boostsToInject
    .map((b) => b.css)
    .filter((css) => css !== undefined)
    .join("\n")
    .trim()

  chrome.scripting.executeScript({
    target: { tabId },
    args: [styles],
    func: (styles) => {
      document.getElementById("surf-boosts")?.remove()

      if (!styles) return
      const style = document.createElement("style")
      style.id = "surf-boosts"
      style.textContent = styles
      document.head.appendChild(style)
    },
  })
}
