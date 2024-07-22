import useStorage from "@/utils/storage/useStorage"
import IndexPage from "./index-page"
import BoostPage from "./boost-page"
import BoostPackPage from "./boost-pack-page"
import BoostsRepoPage from "./boosts-repo-page"

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
    default:
      return <div>404</div>
  }
}
