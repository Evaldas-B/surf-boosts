import { Boost } from "@/utils/storage/boosts"

export default async function injectJs(tabId: number, boostsToInject: Boost[]) {
  const scripts = boostsToInject
    .map((b) => b.javascript)
    .filter((js) => js !== undefined)

  if (!scripts?.length) return

  for (const script of scripts) {
    chrome.scripting.executeScript({
      target: { tabId },
      world: "MAIN",
      args: [script],
      func: (javascript) => {
        const func = new Function(javascript)
        func()
      },
    })
  }
}
