import { z } from "zod"

export const packSchema = z.object({
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().optional(),
  url: z.string(),
  version: z.string(),
  updatedAt: z.coerce.date(),
})

export type Pack = z.infer<typeof packSchema>
