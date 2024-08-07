import {
  PackWithBoosts,
  packWithBoostsSchema,
} from "@/entrypoints/popup/pages/boosts-repo-page/packWithBoostsSchema"
import { baseUrl, NetworkStatus } from "./config"

export default async function fetchPackByUrl(
  packUrl: string,
  statusCallback: (status: NetworkStatus) => void,
) {
  let pack: PackWithBoosts | null = null

  try {
    statusCallback("loading")
    const res = await fetch(`${baseUrl}/${packUrl}.json`)
    const json = await res.json()
    pack = packWithBoostsSchema.parse(json)
  } catch (error) {
    console.log(error)
    statusCallback("error")
  }

  statusCallback("idle")
  return pack
}
