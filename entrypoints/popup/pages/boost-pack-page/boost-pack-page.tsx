import { ExtractNavigationProps } from "@/utils/storage/navigation"
import useStorage from "@/utils/storage/useStorage"
import { Select } from "@mantine/core"
import Boost from "./Boost"
import { groupBy, uniq } from "es-toolkit"

type Props = {
  navigation: ExtractNavigationProps<"/boost-pack">
}

export default function BoostPackPage({ navigation }: Props) {
  const [boosts] = useStorage("BOOSTS")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const packId = navigation.props.boostPackId

  const categoryBoosts = boosts.filter(
    (b) => b.pack === packId && b.category === selectedCategory && !b.isSetup,
  )
  const groupedBoosts = groupBy(categoryBoosts, (b) => b.group)

  const categories = useMemo(
    () =>
      uniq(
        boosts.filter((b) => b.pack === packId).map((b) => b.category),
      ).filter((c) => c !== "_setup") || [],
    [boosts, packId],
  )

  // Initialize select
  const selectInitializedRef = useRef(false)

  useEffect(() => {
    if (selectInitializedRef.current) return

    if (categories.length > 0) {
      const [category] = categories
      setSelectedCategory(category!)
      selectInitializedRef.current = true
    }
  }, [categories])

  return (
    <>
      <Select
        className="mt-3"
        label="Category"
        allowDeselect={false}
        data={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />

      {Object.keys(groupedBoosts).map((group) => (
        <div data-testid={`group-${group}`} key={group}>
          <h3 className="mb-1 mt-3 text-sm uppercase">{group}</h3>

          <div className="flex flex-col gap-2 rounded-xl bg-base-500 p-3">
            {groupedBoosts[group]?.map((boost) => (
              <Boost key={boost.id} boost={boost} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
