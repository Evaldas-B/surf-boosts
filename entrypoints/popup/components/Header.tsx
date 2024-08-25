import useStorage from "@/utils/storage/useStorage"
import { ActionIcon, Divider } from "@mantine/core"
import { createId } from "@paralleldrive/cuid2"
import { IconDownload, IconPlus } from "@tabler/icons-react"

export default function Header() {
  const [_navigation, setNavigation] = useStorage("NAVIGATION")

  return (
    <>
      <header className="flex items-center justify-between gap-3">
        <ActionIcon
          title="Install Boosts"
          color="secondary"
          variant="light"
          radius="md"
          size="lg"
          onClick={() => setNavigation({ path: "/boosts-repo" })}
        >
          <IconDownload className="w-2/3" />
        </ActionIcon>
        <h1
          title="BoostPacks page"
          className="cursor-pointer text-lg font-semibold"
          onClick={() => setNavigation({ path: "/" })}
        >
          SurfBoosts
        </h1>
        <ActionIcon
          title="Create Boost"
          color="secondary"
          variant="light"
          radius="md"
          size="lg"
          onClick={() =>
            setNavigation({
              path: "/boost",
              props: { boostId: createId() },
            })
          }
        >
          <IconPlus className="w-2/3" />
        </ActionIcon>
      </header>
      <Divider className="mt-3" />
    </>
  )
}
