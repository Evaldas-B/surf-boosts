import { type Boost } from "@/utils/storage/boosts"
import useStorage from "@/utils/storage/useStorage"
import { Switch } from "@mantine/core"

type Props = {
  boost: Boost
}

export default function Boost({ boost }: Props) {
  const [_navigation, setNavigation] = useStorage("NAVIGATION")

  const [enabledBoostsIds, setEnabledBoostsIds] =
    useStorage("ENABLED_BOOSTS_IDS")

  const toggleBoost = (boostId: string) => {
    const isEnabled = enabledBoostsIds?.includes(boostId)
    setEnabledBoostsIds(
      isEnabled
        ? enabledBoostsIds.filter((id) => id !== boostId)
        : [...enabledBoostsIds, boostId],
    )
  }

  return (
    <div
      className="flex items-center gap-3"
      key={boost.id}
      data-testid={`boost-${boost.name}`}
    >
      <h4
        data-testid={boost.id}
        className="cursor-pointer text-blue-400 hover:underline"
        onClick={() =>
          setNavigation({ path: "/boost", props: { boostId: boost.id } })
        }
      >
        {boost.name || "UNTITLED BOOST"}
      </h4>

      <Switch
        className="ml-auto"
        data-boost-name={boost.name}
        checked={enabledBoostsIds?.includes(boost.id)}
        onClick={() => toggleBoost(boost.id)}
      />
    </div>
  )
}
