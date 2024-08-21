import { Boost } from "@/utils/storage/boosts"
import { parseBoostIdentifiers } from "./utils"
import { matchPattern } from "browser-extension-url-match"

type RequiredBoostFields = Pick<Boost, "css" | "javascript">
type OptionalBoostFields = Partial<
  Pick<Boost, "pack" | "category" | "group" | "name" | "isPublic">
>

type CreatableBoost = Omit<
  Boost,
  | "id"
  | "pack"
  | "category"
  | "group"
  | "name"
  | "isPublic"
  | "css"
  | "javascript"
> &
  RequiredBoostFields &
  OptionalBoostFields

export default function createBoostFactory(boostPath: string) {
  const {
    id: defaultId,
    pack: defaultPack,
    category: defaultCategory,
    group: defaultGroup,
    name: defaultName,
  } = parseBoostIdentifiers(boostPath)

  return function createBoost({
    pack = defaultPack,
    category = defaultCategory,
    group = defaultGroup,
    name = defaultName,
    isPublic = true,
    ...boost
  }: CreatableBoost) {
    matchPattern(boost.matchPatterns).assertValid()

    boost.css = boost?.css?.trim()
    boost.javascript = boost?.javascript?.trim()

    return {
      id: defaultId,
      pack,
      category,
      group,
      name,
      isPublic,
      ...boost,
    }
  }
}
