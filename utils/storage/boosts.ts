import { z } from "zod"

export const boostSchema = z.object({
  id: z.string(),
  isPublic: z.boolean(),
  isSetup: z.boolean().default(false).catch(false),
  name: z.string(),
  matchPatterns: z.array(z.string()),
  pack: z.string(),
  category: z.string(),
  group: z.string(),
  css: z.string().optional(),
  javascript: z.string().optional(),
})

export const initialValues: Boost = {
  id: "",
  isPublic: false,
  isSetup: false,
  name: "",
  matchPatterns: [],
  pack: "",
  category: "",
  group: "",
  css: "",
  javascript: "",
}

export type Boost = z.infer<typeof boostSchema>
export type BoostSchema = typeof boostSchema
