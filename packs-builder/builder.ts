import { mkdir, readdir, writeFile } from "fs/promises"
import { groupBy, mapValues } from "lodash-es"

import { packSchema } from "./types"
import { boostSchema } from "@/utils/storage/boosts"

async function readPackFiles() {
  const dirents = await readdir("./packs-repo", {
    withFileTypes: true,
    recursive: true,
  })

  const files = dirents.filter(
    (dirent) => dirent.isFile() && dirent.name.endsWith(".ts"),
  )

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

  // Group by boost pack url
  const groupedBoostFiles = groupBy(
    boostFilesWithContent,
    (dirent) => dirent.path.split("/")[1],
  )

  const packs = mapValues(groupedBoostFiles, (files, packUrl) => ({
    ...packFilesWithContent.find(
      (file) => file.parentPath.split("/")[1] === packUrl,
    )!.pack,
    boosts: files.map((file) => file.boost),
  }))

  return packs
}

async function writeJson(filename: string, content: unknown) {
  await mkdir("./built-packs", { recursive: true })
  await writeFile(
    `./built-packs/${filename}.json`,
    JSON.stringify(content, null, 2),
    {
      flag: "w",
    },
  )
}

export default async function buildPacks() {
  const packs = await readPackFiles()

  for (const packUrl in packs) {
    await writeJson(packUrl, packs[packUrl])
  }

  const packsIndex = Object.keys(packs).map((packUrl) => ({
    name: packs[packUrl]!.boosts[0]!.pack,
    url: packUrl,
    description: packs[packUrl]!.description,
    version: packs[packUrl]!.version,
    updatedAt: packs[packUrl]!.updatedAt,
  }))
  await writeJson("index", packsIndex)
}

buildPacks()
