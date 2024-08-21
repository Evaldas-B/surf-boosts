import { z } from "zod"

export type NetworkStatus = "loading" | "error" | "idle"

export type Pack = z.infer<typeof packSchema>
export type PackSchema = typeof packSchema
export const packSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  version: z.string(),
})
