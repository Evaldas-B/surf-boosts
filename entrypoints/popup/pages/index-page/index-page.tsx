import useStorage from "@/utils/storage/useStorage"
import { uniq } from "lodash-es"
import BoostPack from "./BoostPack"
import { Button } from "@mantine/core"
import { createId } from "@paralleldrive/cuid2"

export default function IndexPage() {
  const [boosts] = useStorage("BOOSTS")
  const packs = uniq(boosts.map((boost) => boost.pack)).sort()
  const [_navigation, setNavigation] = useStorage("NAVIGATION")

  return (
    <div className="mt-3 flex flex-col gap-3">
      <h3 className="text-center font-medium">My Boosts</h3>

      {packs.length > 0 &&
        packs.map((pack) => <BoostPack key={pack} name={pack} />)}

      {!packs.length && (
        <div className="mt-10 text-center text-lg">
          No Boosts installed. You can{" "}
          <Button
            size="compact-sm"
            onClick={() =>
              setNavigation({
                path: "/boost",
                props: { boostId: createId() },
              })
            }
          >
            create
          </Button>{" "}
          your own boosts or{" "}
          <Button
            size="compact-sm"
            onClick={() => setNavigation({ path: "/boosts-repo" })}
          >
            install public boosts
          </Button>
        </div>
      )}
    </div>
  )
}
