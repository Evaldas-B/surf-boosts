import fetchPackByUrl from "@/utils/remote-packs/fetchPackByUrl"
import { ExtractNavigationProps } from "@/utils/storage/navigation"
import { PackWithBoosts } from "../boosts-repo-page/packWithBoostsSchema"
import { IconBolt, IconBrandJavascript } from "@tabler/icons-react"
import PackInstaller from "../boosts-repo-page/PackInstaller"
import { NetworkStatus } from "@/utils/remote-packs/config"

type Props = {
  navigation: ExtractNavigationProps<"/remote-boost-pack">
}

export default function RemoteBoostsPackPage({ navigation }: Props) {
  const [pack, setPack] = useState<PackWithBoosts | null>(null)
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle")

  const packUrl = navigation.props.boostPackUrl
  const usesJavascript = pack?.boosts.some((b) => !!b.javascript)

  useEffect(() => {
    async function fetch() {
      const pack = await fetchPackByUrl(packUrl, setNetworkStatus)
      setPack(pack)
    }

    fetch()
  }, [packUrl])

  if (networkStatus === "loading") return <div>Loading...</div>
  if (!pack)
    return <div className="mt-5 text-center">Failed to retrieve the pack</div>

  return (
    <div className="mt-5 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">{pack?.name}</h1>
        <PackInstaller packUrl={pack?.url} />
      </div>
      <p className="mt-3">{pack?.description}</p>
      <p className="mt-5 flex">
        <IconBolt className="inline-block rotate-12 text-yellow-400" />
        Total Boosts:
        <span className="ml-1 font-medium">{pack?.boosts.length}</span>
      </p>
      <p className="flex items-center">
        <IconBrandJavascript className="text-blue-500" /> Uses JavaScript:{" "}
        {usesJavascript ? "Yes" : "No"}
      </p>
    </div>
  )
}
