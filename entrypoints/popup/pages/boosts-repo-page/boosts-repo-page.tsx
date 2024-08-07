import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"

import PackInstaller from "./PackInstaller"
import { Pack } from "@/packs-builder/types"
import { NetworkStatus } from "@/utils/remote-packs/config"
import { fetchPacksIndex } from "@/utils/remote-packs/fetchPacksIndex"

export default function BoostsRepoPage() {
  const [packsIndex, setPacksIndex] = useState<Pack[]>([])
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle")

  useEffect(() => {
    async function fetch() {
      const packs = await fetchPacksIndex(setNetworkStatus)
      setPacksIndex(packs)
    }

    fetch()
  }, [])

  return (
    <div className="flex flex-col p-3">
      {networkStatus === "loading" && <Loader className="mx-auto mt-5" />}
      {networkStatus === "error" && (
        <p className="mt-5 text-center text-red-400">
          Error fetching boosts...
        </p>
      )}
      {networkStatus === "idle" && (
        <ul className="mt-5 flex flex-col gap-2">
          {packsIndex.map((pack) => (
            <li
              key={pack.url}
              className="mb-4 flex items-center justify-between"
            >
              <h3 className="font-bold">{pack.name}</h3>
              <PackInstaller packUrl={pack.url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
