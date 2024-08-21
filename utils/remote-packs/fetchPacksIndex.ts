import { z } from "zod"
import { NetworkStatus, Pack, packSchema } from "./types"
import { remotePacksUrl } from "../config"

export async function fetchPacksIndex(
  statusCallback: (status: NetworkStatus) => void,
) {
  let packs: Pack[] = []

  try {
    statusCallback("loading")
    const res = await fetch(`${remotePacksUrl}/index.json`)
    packs = z.array(packSchema).parse(await res.json())
    statusCallback("idle")
  } catch (_error) {
    console.error(_error)
    statusCallback("error")
  }

  return packs
}
