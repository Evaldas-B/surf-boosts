import {
  Autocomplete,
  Button,
  Checkbox,
  TagsInput,
  TextInput,
} from "@mantine/core"

import useStorage from "@/utils/storage/useStorage"
import { useBoostFormContext } from "./boost-form-context"
import ConfirmDeleteInline from "../../components/ConfirmDeleteInline"
import ReadOnlyAccessAlert from "./ReadOnlyAccess"
import { uniq } from "es-toolkit"

export default function ConfigTab() {
  const form = useBoostFormContext()

  const [boosts, setBoosts] = useStorage("BOOSTS")
  const [enabledBoostsIds, setEnabledBoostsIds] =
    useStorage("ENABLED_BOOSTS_IDS")

  const [navigation, setNavigation] = useStorage("NAVIGATION")
  if (navigation.path !== "/boost") return
  const boostId = navigation.props.boostId

  const packs = uniq(
    boosts
      .filter((boost) => boost.isPublic === false)
      .map((boost) => boost.pack),
  )

  const categories = uniq(
    boosts
      .filter((boost) => boost.pack === form.values["pack"])
      .map((boost) => boost.category),
  )

  const groups = uniq(
    boosts
      .filter((boost) => boost.pack === form.values["pack"])
      .filter((boost) => boost.category === form.values["category"])
      .map((boost) => boost.group),
  )

  const deleteBoost = () => {
    const deletedBoost = boosts.find((boost) => boost.id === boostId)
    if (!deletedBoost) throw new Error("Boost not found")

    setBoosts(boosts.filter((boost) => boost.id !== boostId))
    setEnabledBoostsIds(enabledBoostsIds.filter((id) => id !== boostId))

    const numOfRemainingBoostsInPack = boosts.filter(
      (boost) => boost.pack === deletedBoost.pack,
    ).length

    console.log({ numOfRemainingBoostsInPack })

    if (numOfRemainingBoostsInPack === 1) {
      setNavigation({
        path: "/",
      })
    } else {
      setNavigation({
        path: "/boost-pack",
        props: { boostPackId: deletedBoost.pack },
      })
    }
  }

  const { isPublic } = form.getValues()

  return (
    <div className="flex flex-col gap-1">
      {import.meta.env.MODE === "e2e" && (
        <>
          <TextInput label="Boost ID" {...form.getInputProps("id")} />
          <Checkbox label="isPublic" {...form.getInputProps("isPublic")} />
        </>
      )}

      <TextInput
        label="Boost name"
        disabled={isPublic}
        {...form.getInputProps("name")}
      />
      <TagsInput
        label="Match Patterns"
        placeholder="*://*.example.com/*"
        disabled={isPublic}
        {...form.getInputProps("matchPatterns")}
      />

      <Autocomplete
        label="Pack"
        data={packs}
        disabled={isPublic}
        {...form.getInputProps("pack")}
      />

      <Autocomplete
        label="Category"
        data={categories}
        disabled={isPublic}
        {...form.getInputProps("category")}
      />

      <Autocomplete
        label="Group"
        data={groups}
        disabled={isPublic}
        {...form.getInputProps("group")}
      />

      {isPublic ? (
        <ReadOnlyAccessAlert className="mt-5" />
      ) : (
        <div className="mt-3 flex gap-3">
          <ConfirmDeleteInline
            onDelete={deleteBoost}
            message="Delete this boost?"
          />

          <Button title="Save boost" type="submit" className="w-full">
            Save
          </Button>
        </div>
      )}
    </div>
  )
}
