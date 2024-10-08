import useStorage from "@/utils/storage/useStorage"
import IndexPage from "./index-page/index-page"
import BoostPage from "./boost-page/boost-page"
import BoostPackPage from "./boost-pack-page/boost-pack-page"
import BoostsRepoPage from "./boosts-repo-page/boosts-repo-page"
import RemoteBoostsPackPage from "./remote-boosts-pack-page/remote-boosts-pack-pages"

export default function PageRenderer() {
  const [navigation] = useStorage("NAVIGATION")

  switch (navigation.path) {
    case "/":
      return <IndexPage />
    case "/boost":
      return <BoostPage navigation={navigation} />
    case "/boost-pack":
      return <BoostPackPage navigation={navigation} />
    case "/boosts-repo":
      return <BoostsRepoPage />
    case "/remote-boost-pack":
      return <RemoteBoostsPackPage navigation={navigation} />
    default:
      return <div>404</div>
  }
}
