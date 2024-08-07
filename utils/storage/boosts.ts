import { z } from "zod"

export const boostSchema = z.object({
  id: z.string(),
  isPublic: z.boolean(),
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
  name: "",
  matchPatterns: [],
  pack: "",
  category: "",
  group: "",
  css: "",
  javascript: "",
}

export type Boost = z.infer<typeof boostSchema>
