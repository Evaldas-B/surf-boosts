import { Button, Loader } from "@mantine/core"
import { useState } from "react"

import useStorage from "@/utils/storage/useStorage"
import fetchPackByUrl from "@/utils/remote-packs/fetchPackByUrl"
import { NetworkStatus } from "@/utils/remote-packs/config"

type Props = {
  packUrl: string
}

export default function PackInstaller({ packUrl }: Props) {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle")
  const [boosts, setBoosts] = useStorage("BOOSTS")
  const [installedPublicPacks, setInstalledPublicPacks] = useStorage(
    "INSTALLED_PUBLIC_PACKS",
  )

  async function registerBoostPack(packUrl: string) {
    const pack = await fetchPackByUrl(packUrl, setNetworkStatus)
    if (!pack) return

    setInstalledPublicPacks([...installedPublicPacks, pack.url])
    setBoosts([...boosts, ...pack.boosts])
  }

  async function deregisterBoostPack(packUrl: string) {
    const pack = await fetchPackByUrl(packUrl, setNetworkStatus)
    if (!pack) return
    const boostsIdsToRemove = pack.boosts.map((boost) => boost.id)

    setInstalledPublicPacks(
      installedPublicPacks.filter((pack) => pack !== packUrl),
    )

    setBoosts(boosts.filter((boost) => !boostsIdsToRemove.includes(boost.id)))
  }

  const buttonContent = () => {
    if (networkStatus === "loading") {
      return <Loader size="xs" color="gray" />
    } else if (installedPublicPacks.includes(packUrl)) {
      return "Uninstall"
    } else {
      return "Install"
    }
  }

  return (
    <Button
      className="w-20"
      color={!installedPublicPacks.includes(packUrl) ? "green" : "red"}
      size="compact-sm"
      onClick={() =>
        !installedPublicPacks.includes(packUrl)
          ? registerBoostPack(packUrl)
          : deregisterBoostPack(packUrl)
      }
    >
      {buttonContent()}
    </Button>
  )
}
