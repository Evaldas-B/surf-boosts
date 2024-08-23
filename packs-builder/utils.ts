import { packsRepoDirName, packRootName } from "@/utils/config"
import { SetOptional } from "type-fest"
import { BoostFile, PackFile } from "./types"
import { boostSchema, BoostSchema } from "@/utils/storage/boosts"
import { Dirent } from "fs"
import { z } from "zod"
import path from "node:path"
import { PackSchema, packSchema } from "@/utils/remote-packs/types"

function camelCaseToStartCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before each capital letter
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter of the string
}

export function filterDevFiles(dirent: Dirent) {
  if (process.argv.includes("--dev")) return true

  const [_, packIdentifier] = dirent.parentPath.split(`/${packsRepoDirName}/`)
  if (!packIdentifier)
    throw new Error(
      `Failed to parse pack identifier from path: ${dirent.parentPath}`,
    )

  if (packIdentifier.startsWith("_")) return false

  return true
}

export function parseBoostIdentifiers(path: string, isSetup = false) {
  if (path.endsWith(".ts")) path = path.slice(0, -3)
  else
    throw new Error(`Only files with .ts extension are supported. Got: ${path}`)

  const [_, pathParts] = path.split(`/${packsRepoDirName}/`)

  if (!pathParts)
    throw new Error(`Failed to parse boost identifiers from path: ${path}`)

  const parts = pathParts.split("/").map((p) => camelCaseToStartCase(p))

  if (isSetup) {
    const [pack, name] = parts
    return { id: pathParts, pack, category: "_setup", group: "_setup", name }
  } else {
    const [pack, category, group, name] = parts

    if (!pack) throw new Error(`Failed to parse pack from path: ${path}`)
    if (!category) throw new Error(`Failed to parse category from path: ${path}`)
    if (!group) throw new Error(`Failed to parse group from path: ${path}`)
    if (!name) throw new Error(`Failed to parse name from path: ${path}`)

    return { id: pathParts, pack, category, group, name }
  }
}

export function parsePackIdentifiers(path: string) {
  if (!path.endsWith(packRootName))
    throw new Error(`Pack root file should be named ${packRootName}`)
  path = path.slice(0, -packRootName.length - 1)

  const [_, packUrl] = path.split(`/${packsRepoDirName}/`)

  if (!packUrl) throw new Error(`Failed to parse pack name from path: ${path}`)

  return { name: camelCaseToStartCase(packUrl), url: packUrl }
}

type BoostFileOptional = SetOptional<BoostFile, "boost">
type PackFileOptional = SetOptional<PackFile, "pack">

async function getFileContent<S extends PackSchema | BoostSchema>(
  file: Dirent,
  parserSchema: S,
): Promise<z.infer<S>> {
  const filePath = path.join(file.parentPath, file.name)

  let content: { default: unknown }

  try {
    content = await import(filePath)
  } catch (err) {
    throw new Error(`Failed to read file: ${filePath}`, { cause: err })
  }

  try {
    return parserSchema.parse(content.default)
  } catch (err) {
    throw new Error(`Failed to parse file: ${filePath}`, { cause: err })
  }
}

export async function getBoostFilesWithContent(
  boostFiles: BoostFileOptional[],
): Promise<BoostFile[]> {
  return Promise.all(
    boostFiles.map(async ({ dirent }) => ({
      dirent,
      boost: await getFileContent(dirent, boostSchema),
    })),
  )
}

export async function getPackFilesWithContent(
  packFiles: PackFileOptional[],
): Promise<PackFile[]> {
  return Promise.all(
    packFiles.map(async ({ dirent }) => ({
      dirent,
      pack: await getFileContent(dirent, packSchema),
    })),
  )
}
