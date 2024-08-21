import { Pack } from "@/utils/remote-packs/types"
import { parsePackIdentifiers } from "./utils"

type RequiredPackFields = Pick<Pack, "description" | "version">
type OptionalPackFields = Partial<Pick<Pack, "name">>

type CreatablePack = Omit<Pack, "name" | "url"> &
  RequiredPackFields &
  OptionalPackFields

export default function createPackFactory(packPath: string) {
  const { name: defaultName, url } = parsePackIdentifiers(packPath)

  return function createPack({
    name = defaultName,
    description,
    version,
  }: CreatablePack) {
    return {
      name,
      description,
      url,
      version,
    }
  }
}
