/** Attribute name that gets used as an identifier for extension classes*/
export const attributeName = "srf-handle"

/** Prefixes that browsers use for their internal pages */
export const browserInternalSchemes = [
  "chrome://",
  "edge://",
  "about:", // Firefox
  "safari-resource://",
  "opera://",
  "vivaldi://",
]
/** Flag that indicates if the app is running in test mode */
export const isTest = import.meta.env?.MODE === "e2e"

/** Flag that indicates if the app is running in development mode */
export const isDev = import.meta.env?.DEV

/** Name of the source directory of boost packs */
export const packsRepoDirName = "packs-repo"

/** Name of the pack manifest file */
export const packRootName = "_pack.ts"

/** Name of the setup boosts */
export const setupBoostsName = "_setup"

const remotePacksProdUrl =
  "https://raw.githubusercontent.com/Evaldas-B/surf-boosts/master/packs-built"
const remotePacksDevUrl = "http://localhost:3001"

/** URL of the remote repository that contains the boost packs */
export const remotePacksUrl =
  isTest || isDev ? remotePacksDevUrl : remotePacksProdUrl
