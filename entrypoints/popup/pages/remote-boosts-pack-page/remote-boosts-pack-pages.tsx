import fetchPackByUrl from "@/utils/remote-packs/fetchPackByUrl"
import { ExtractNavigationProps } from "@/utils/storage/navigation"
import { PackWithBoosts } from "../boosts-repo-page/packWithBoostsSchema"
import { IconBolt, IconBrandJavascript } from "@tabler/icons-react"
import PackInstaller from "../boosts-repo-page/PackInstaller"
import { NetworkStatus } from "@/utils/remote-packs/types"

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

  if (networkStatus === "loading")
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  if (!pack)
    return (
      <div className="mt-5 text-center text-red-500">
        Failed to retrieve the pack
      </div>
    )

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-lg bg-gray-800 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{pack?.name}</h1>
        <PackInstaller packUrl={pack?.url} />
      </div>
      <p className="mt-3 text-gray-300">{pack?.description}</p>
      <div className="mt-5 flex flex-col gap-2">
        <p className="flex items-center text-gray-300">
          <IconBolt className="mr-2 inline-block rotate-12 text-yellow-400" />
          Total Boosts:
          <span className="ml-1 font-medium">{pack?.boosts.length}</span>
        </p>
        <p className="flex items-center text-gray-300">
          <IconBrandJavascript className="mr-2 text-blue-400" />
          Uses JavaScript:{" "}
          <span className="ml-1 font-medium">
            {usesJavascript ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  )
}
