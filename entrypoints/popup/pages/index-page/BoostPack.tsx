import useStorage from "@/utils/storage/useStorage"
import { Switch } from "@mantine/core"
import { IconPackage } from "@tabler/icons-react"

type Props = {
  name: string
}

export default function BoostPack({ name }: Props) {
  const [_navigation, setNavigation] = useStorage("NAVIGATION")
  const [disabledPacks, setDisabledPacks] = useStorage("DISABLED_PACKS")

  function togglePack(pack: string) {
    const isEnabled = disabledPacks.includes(pack)

    if (isEnabled) {
      setDisabledPacks(disabledPacks.filter((p) => p !== pack))
    } else {
      setDisabledPacks([...disabledPacks, pack])
    }
  }

  return (
    <div className="flex items-center" data-testid={`pack-${name}`}>
      <div
        className="flex cursor-pointer items-center gap-1 text-lg text-blue-400 hover:underline"
        onClick={() =>
          setNavigation({ path: "/boost-pack", props: { boostPackId: name } })
        }
      >
        <IconPackage className="size-8 text-gray-400" />
        {name}
      </div>

      <Switch
        className="ml-auto"
        data-pack-name={name}
        checked={!disabledPacks?.includes(name)}
        onClick={() => togglePack(name)}
      />
    </div>
  )
}
