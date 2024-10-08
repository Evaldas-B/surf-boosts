import { packSchema } from "@/utils/remote-packs/types"
import { boostSchema } from "@/utils/storage/boosts"
import { z } from "zod"

export const packWithBoostsSchema = packSchema.extend({
  boosts: boostSchema.array(),
})

export type PackWithBoosts = z.infer<typeof packWithBoostsSchema>
