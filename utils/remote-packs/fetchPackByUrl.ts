import {
  PackWithBoosts,
  packWithBoostsSchema,
} from "@/entrypoints/popup/pages/boosts-repo-page/packWithBoostsSchema"
import { NetworkStatus } from "./types"
import { remotePacksUrl } from "../config"

export default async function fetchPackByUrl(
  packUrl: string,
  statusCallback: (status: NetworkStatus) => void,
) {
  let pack: PackWithBoosts | null = null

  try {
    statusCallback("loading")
    const res = await fetch(`${remotePacksUrl}/${packUrl}.json`)
    const json = await res.json()
    pack = packWithBoostsSchema.parse(json)
  } catch (error) {
    console.error(error)
    statusCallback("error")
  }

  statusCallback("idle")
  return pack
}
