import { packSchema } from "@/packs-builder/types"
import { boostSchema } from "@/utils/storage/boosts"
import { z } from "zod"

export const packWithBoostsSchema = packSchema.extend({
  boosts: boostSchema.array(),
})

export type PackWithBoosts = z.infer<typeof packWithBoostsSchema>
