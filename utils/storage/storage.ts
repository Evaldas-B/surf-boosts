import navigationStorageItem from "./navigation"
import { Boost } from "./boosts"
import { storage } from "wxt/storage"

const defineItem = storage.defineItem

export default {
  NAVIGATION: navigationStorageItem,
  BOOSTS: defineItem<Boost[]>("local:BOOSTS", {
    defaultValue: [],
  }),
  ENABLED_BOOSTS_IDS: defineItem<string[]>("local:ENABLED_BOOSTS_IDS", {
    defaultValue: [],
  }),
  DISABLED_PACKS: defineItem<string[]>("local:DISABLED_PACKS", {
    defaultValue: [],
  }),
  INSTALLED_PUBLIC_PACKS: defineItem<string[]>("local:INSTALLED_PUBLIC_PACKS", {
    defaultValue: [],
  }),
} as const

export type StorageItems = typeof storage
export type StorageKeys = keyof typeof storage
