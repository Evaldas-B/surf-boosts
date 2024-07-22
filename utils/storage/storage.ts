import navigationStorageItem from "../navigation"

const storageItems = {
  NAVIGATION: navigationStorageItem,
} as const

export type StorageItems = typeof storageItems
export type StorageKeys = keyof typeof storageItems
export default storageItems
