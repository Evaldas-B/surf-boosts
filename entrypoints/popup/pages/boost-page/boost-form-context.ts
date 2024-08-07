import { Boost } from "@/utils/storage/boosts"
import storage from "@/utils/storage/storage"
import { createFormContext, UseFormInput } from "@mantine/form"

export const validate: UseFormInput<Boost>["validate"] = {
  name: (value) =>
    !value || value.trim().length <= 0 ? "Name is required" : null,
  pack: (value) =>
    !value || value.trim().length <= 0 ? "Pack is required" : null,
  matchPatterns: (value) =>
    value.length <= 0 ? "Match Patterns is required" : null,
}

export const [BoostFormProvider, useBoostFormContext, useBoostForm] =
  createFormContext<Boost>()

export const boostFormSubmitHandler = async (boost: Boost) => {
  const storageBoosts = storage["BOOSTS"]
  const boosts = await storageBoosts.getValue()

  if (!boost.category) {
    boost.category = "No category"
  }

  const previousBoosts = boosts.filter((b) => b.id !== boost.id)
  await storageBoosts.setValue([...previousBoosts, boost])

  // Make the boost enabled by default by storing its id in the enabled boosts
  const storageEnabledBoostsIds = storage.ENABLED_BOOSTS_IDS
  const enabledBoostsIds = await storageEnabledBoostsIds.getValue()

  if (!enabledBoostsIds.includes(boost.id))
    storageEnabledBoostsIds.setValue([...enabledBoostsIds, boost.id])

  const storageNavigation = storage.NAVIGATION
  await storageNavigation.setValue({
    path: "/boost-pack",
    props: { boostPackId: boost.pack },
  })
}
