import { z } from "zod"
import { baseUrl, NetworkStatus } from "./config"
import { Pack, packSchema } from "@/packs-builder/types"

export async function fetchPacksIndex(
  statusCallback: (status: NetworkStatus) => void,
) {
  let packs: Pack[] = []

  try {
    statusCallback("loading")
    const res = await fetch(`${baseUrl}/index.json`)
    packs = z.array(packSchema).parse(await res.json())
    statusCallback("idle")
  } catch (_error) {
    console.log(_error)
    statusCallback("error")
  }

  return packs
}
