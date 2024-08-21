import { packSchema } from "@/utils/remote-packs/types"
import { boostSchema } from "@/utils/storage/boosts"
import { Dirent } from "node:fs"
import { z } from "zod"

export type PackFile = z.infer<typeof packFileSchema>
export type PackFileSchema = typeof packFileSchema
export const packFileSchema = z.object({
  dirent: z.instanceof(Dirent),
  pack: packSchema,
})

export type BoostFile = z.infer<typeof boostFileSchema>
export type BoostFileSchema = typeof boostFileSchema
export const boostFileSchema = z.object({
  dirent: z.instanceof(Dirent),
  boost: boostSchema,
})

export type PackWithBoosts = z.infer<typeof packWithBoosts>
export type PackWithBoostsSchema = typeof packWithBoosts
export const packWithBoosts = z.object({
  pack: packSchema,
  boosts: z.array(boostSchema),
})
