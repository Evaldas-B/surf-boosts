import useStorage from "@/utils/storage/useStorage"
import { uniq } from "lodash-es"
import BoostPack from "./BoostPack"

export default function IndexPage() {
  const [boosts] = useStorage("BOOSTS")
  const packs = uniq(boosts.map((boost) => boost.pack)).sort()

  return (
    <div className="mt-3 flex flex-col gap-3">
      {packs.map((pack) => (
        <BoostPack key={pack} name={pack} />
      ))}
    </div>
  )
}
