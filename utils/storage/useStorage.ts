import storage from "./storage"

export default function useStorage<K extends keyof typeof storage>(
  key: K,
): [(typeof storage)[K]["defaultValue"], (typeof storage)[K]["setValue"]] {
  const storageItem = storage[key]

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
