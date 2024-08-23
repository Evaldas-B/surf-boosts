import { Boost } from "@/utils/storage/boosts"
import { parseBoostIdentifiers } from "./utils"
import { matchPattern } from "browser-extension-url-match"
import { RequireAtLeastOne } from "type-fest"

type RequiredBoostFields = Pick<Boost, "matchPatterns"> &
  RequireAtLeastOne<{
    css: string
    javascript: string
  }>

type OptionalBoostFields = Partial<Pick<Boost, "name">>

export type CreatableBoost = RequiredBoostFields & OptionalBoostFields

export default function createBoostFactory(boostPath: string, isSetup = false) {
  const {
    id: inferredId,
    pack: inferredPack,
    category: inferredCategory,
    group: inferredGroup,
    name: inferredName,
  } = parseBoostIdentifiers(boostPath, isSetup)

  return function createBoost({
    name = inferredName,
    ...boost
  }: CreatableBoost) {
    matchPattern(boost.matchPatterns).assertValid()

    boost.css = boost?.css?.trim()
    boost.javascript = boost?.javascript?.trim()

    return {
      id: inferredId,
      pack: inferredPack,
      category: inferredCategory,
      group: inferredGroup,
      name,
      isPublic: true,
      isSetup,
      ...boost,
    }
  }
}
