export type NetworkStatus = "loading" | "error" | "idle"

const productionUrl =
  "https://raw.githubusercontent.com/Evaldas-B/surf-boosts/master/built-packs"

const devUrl = "http://localhost:3001/"

export const baseUrl =
  import.meta.env.DEV || import.meta.env.MODE === "e2e" ? devUrl : productionUrl
