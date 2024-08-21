import createPackFactory from "@/packs-builder/createPackFactory"

const createPack = createPackFactory(import.meta.url)

export default createPack({
  description: "Example pack",
  version: "0.0.1",
})
