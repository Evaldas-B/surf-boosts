import storageItems from "./storage"

export default function useStorage<K extends keyof typeof storageItems>(
  key: K,
): [
  (typeof storageItems)[K]["defaultValue"],
  (typeof storageItems)[K]["setValue"],
] {
  const storageItem = storageItems[key]

  const [state, setState] = useState(storageItem.defaultValue)

  useEffect(() => {
    const unwatch = storageItem.watch((newValue) => setState(newValue))

    async function initializeState() {
      const initialState = await storageItem.getValue()
      setState(initialState)
    }
    initializeState()

    return () => {
      unwatch()
    }
  }, [storageItem])

  return [state, storageItem.setValue] as const
}
