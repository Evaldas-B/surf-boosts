const storageItems = {
  NAVIGATION: storage.defineItem("local:NAVIGATION", { defaultValue: "/" }),
} as const

export type StorageItems = typeof storageItems
export type StorageKeys = keyof typeof storageItems
export default storageItems
