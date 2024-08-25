import { Button, Loader } from "@mantine/core"
import { useState } from "react"

import useStorage from "@/utils/storage/useStorage"
import fetchPackByUrl from "@/utils/remote-packs/fetchPackByUrl"
import { NetworkStatus } from "@/utils/remote-packs/types"

type Props = {
  packUrl: string
}

export default function PackInstaller({ packUrl }: Props) {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle")
  const [boosts, setBoosts] = useStorage("BOOSTS")
  const [installedPublicPacks, setInstalledPublicPacks] = useStorage(
    "INSTALLED_PUBLIC_PACKS",
  )
  const [disabledPacks, setDisabledPacks] = useStorage("DISABLED_PACKS")
  const [enabledBoostsIds, setEnabledBoostsIds] =
    useStorage("ENABLED_BOOSTS_IDS")

  async function registerBoostPack(packUrl: string) {
    const pack = await fetchPackByUrl(packUrl, setNetworkStatus)
    if (!pack) return

    setInstalledPublicPacks([...installedPublicPacks, pack.url])
    setBoosts([...boosts, ...pack.boosts])
  }

  async function uninstallBoostPack(packUrl: string) {
    const pack = await fetchPackByUrl(packUrl, setNetworkStatus)
    if (!pack) return
    const boostsIdsToRemove = pack.boosts.map((boost) => boost.id)

    setInstalledPublicPacks(
      installedPublicPacks.filter((pack) => pack !== packUrl),
    )

    setDisabledPacks(
      disabledPacks.filter((disabledPack) => disabledPack !== pack.name),
    )

    setEnabledBoostsIds(
      enabledBoostsIds.filter((id) => !boostsIdsToRemove.includes(id)),
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
      color={!installedPublicPacks.includes(packUrl) ? "primary" : "secondary"}
      variant={!installedPublicPacks.includes(packUrl) ? "filled" : "light"}
      size="compact-sm"
      onClick={() =>
        !installedPublicPacks.includes(packUrl)
          ? registerBoostPack(packUrl)
          : uninstallBoostPack(packUrl)
      }
    >
      {buttonContent()}
    </Button>
  )
}
