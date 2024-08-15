import { browserInternalSchemes } from "@/utils/config"

export function runningOnBrowserPages(tabUrl: string) {
  return browserInternalSchemes.some((scheme) => tabUrl.startsWith(scheme))
}

export async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}
