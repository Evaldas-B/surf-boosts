import { mkdir, readdir, writeFile } from "fs/promises"

import { packSchema } from "./types"
import { boostSchema } from "@/utils/storage/boosts"
import { Dirent } from "fs"
import { argv } from "process"
import { groupBy, mapValues } from "es-toolkit"

const isDev = argv.includes("--dev")

async function getBoostFilesWithContent(files: Dirent[]) {
  const boostFiles = files.filter((file) => file.name !== "_pack.ts")

  const boostFilesWithContent = await Promise.all(
    boostFiles.map(async (file) => {
      const boostRaw = await import(`../${file.parentPath}/${file.name}`)
      const boost = boostSchema.parse(boostRaw.default)
      return {
        ...file,
        boost,
      }
    }),
  )

  return boostFilesWithContent
}

async function getPackFilesWithContent(files: Dirent[]) {
  const packFiles = files.filter((file) => file.name === "_pack.ts")

  const packFilesWithContent = await Promise.all(
    packFiles.map(async (file) => {
      const packRaw = await import(`../${file.parentPath}/${file.name}`)
      const pack = packSchema.parse(packRaw.default)
      return {
        ...file,
        pack,
      }
    }),
  )

  return packFilesWithContent
}

async function readPackFiles() {
  const dirents = await readdir("./packs-repo", {
    withFileTypes: true,
    recursive: true,
  })

  const files = dirents.filter((dirent) => {
    return (
      dirent.isFile() &&
      dirent.name.endsWith(".ts") &&
      (isDev || !dirent.parentPath.split("/")[1]!.startsWith("_"))
    )
  })

  // Expecting not to receive files whose parent dir starts with underscore in dev mode. What is the issue here?
  console.log(files.map((f) => f.parentPath))

  const boostFilesWithContent = await getBoostFilesWithContent(files)
  const packFilesWithContent = await getPackFilesWithContent(files)

  // Group by boost pack url
  const groupedBoostFiles = groupBy(
    boostFilesWithContent,
    (dirent) => dirent.parentPath.split("/")[1] ?? "",
  )

  const packs = mapValues(groupedBoostFiles, (files, packUrl) => ({
    ...packFilesWithContent.find(
      (file) => file.parentPath.split("/")[1] === packUrl,
    )!.pack,
    boosts: files.map((file) => file.boost),
  }))

  return packs
}

async function writeJson(
  directory: string,
  filename: string,
  content: unknown,
) {
  const jsonContent = JSON.stringify(content, null, 2)
  await mkdir(directory, { recursive: true })
  await writeFile(`./${directory}/${filename}.json`, jsonContent, { flag: "w" })
}

export default async function buildPacks() {
  const directory = isDev ? "built-packs-dev" : "built-packs"
  const packs = await readPackFiles()

  for (const packUrl in packs) {
    await writeJson(directory, packUrl, packs[packUrl])
  }

  const packsIndex = Object.keys(packs).map((packUrl) => ({
    name: packs[packUrl]!.boosts[0]!.pack,
    url: packUrl,
    description: packs[packUrl]!.description,
    version: packs[packUrl]!.version,
    updatedAt: packs[packUrl]!.updatedAt,
  }))
  await writeJson(directory, "index", packsIndex)
}

buildPacks()
