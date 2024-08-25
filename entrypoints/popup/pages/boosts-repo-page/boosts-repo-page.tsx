import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"

import PackInstaller from "./PackInstaller"
import { NetworkStatus, Pack } from "@/utils/remote-packs/types"
import { fetchPacksIndex } from "@/utils/remote-packs/fetchPacksIndex"
import useStorage from "@/utils/storage/useStorage"

export default function BoostsRepoPage() {
  const [packsIndex, setPacksIndex] = useState<Pack[]>([])
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle")
  const [_navigation, setNavigation] = useStorage("NAVIGATION")

  useEffect(() => {
    async function fetch() {
      const packs = await fetchPacksIndex(setNetworkStatus)
      setPacksIndex(packs)
    }

    fetch()
  }, [])

  return (
    <div className="flex flex-col p-3">
      <h3 className="text-center font-medium">Boosts Marketplace</h3>
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
              <h3
                className="cursor-pointer text-blue-400 hover:underline"
                onClick={() =>
                  setNavigation({
                    path: "/remote-boost-pack",
                    props: { boostPackUrl: pack.url },
                  })
                }
              >
                {pack.name}
              </h3>
              <PackInstaller packUrl={pack.url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
