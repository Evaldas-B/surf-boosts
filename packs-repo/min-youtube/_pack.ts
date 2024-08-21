import createPackFactory from "@/packs-builder/createPackFactory"

const createPack = createPackFactory(import.meta.url)

export default createPack({
  description: "Allows to remove unnecessary elements from YouTube",
  version: "0.0.2",
})
