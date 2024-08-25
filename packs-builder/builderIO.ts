import { packRootName, packsRepoDirName } from "@/utils/config"
import { partition } from "es-toolkit"
import { Dirent } from "fs"
import path from "node:path"
import { BoostFile, PackFile, PackWithBoosts } from "./types"
import fs from "node:fs/promises"
import { filterDevFiles } from "./utils"
import { setupBoostsName } from "@/utils/config"

const isDev = process.argv.includes("--dev")
const builtPacksDirName = isDev ? "packs-built-dev" : "packs-built"

const packsRepoPath = path.join(import.meta.dirname, `../${packsRepoDirName}`)
const builtPacksPath = path.join(import.meta.dirname, `../${builtPacksDirName}`)

export async function readPacksRepoFiles() {
  let dirents: Dirent[]

  try {
    dirents = await fs.readdir(packsRepoPath, {
      withFileTypes: true,
      recursive: true,
    })
  } catch (err) {
    throw new Error("Failed to read packs-repo directory", { cause: err })
  }

  const files = dirents
    .filter((dirent) => dirent.isFile() && filterDevFiles(dirent))
    .map((dirent) => ({ dirent }))

  const [packFiles, boostAndSetupFiles] = partition(
    files,
    ({ dirent }) => dirent.name === packRootName,
  )

  const [boostFiles, setupBoostFiles] = partition(
    boostAndSetupFiles,
    ({ dirent }) => !dirent.parentPath.endsWith(setupBoostsName),
  )

  return { packFiles, boostFiles, setupBoostFiles }
}

export async function reCreatePacksDir() {
  try {
    await fs.rm(builtPacksPath, { recursive: true, force: true })
  } catch (err) {
    throw new Error(`Failed to remove packs directory: ${builtPacksPath}`, {
      cause: err,
    })
  }
  try {
    await fs.mkdir(builtPacksPath)
  } catch (err) {
    throw new Error(`Failed to create packs directory: ${builtPacksPath}`, {
      cause: err,
    })
  }
}

export function groupBoostsWithPacks(
  packsFiles: PackFile[],
  boostsFiles: BoostFile[],
): PackWithBoosts[] {
  const boosts = boostsFiles.map(({ boost }) => boost)

  const packsWithBoosts = packsFiles.map(({ pack }) => ({
    pack,
    boosts: boosts.filter((b) => b.id.startsWith(pack.url)),
  }))

  return packsWithBoosts
}

export function logTask(packsWithBoosts: PackWithBoosts[]) {
  console.log(`\n🚀 Built ${packsWithBoosts.length} packs\n`)
  for (const pack of packsWithBoosts) {
    console.log(`   📦  ${pack.pack.name} - ${pack.boosts.length} boosts ⚡`)
  }

  console.log()
}

export async function writePacks(packsWithBoosts: PackWithBoosts[]) {
  for (const pack of packsWithBoosts) {
    const { boosts } = pack
    const json = JSON.stringify({ ...pack.pack, boosts }, null, 2)
    await fs.writeFile(path.join(builtPacksPath, `${pack.pack.url}.json`), json)
  }
}

export async function writePacksIndex(packs: PackFile[]) {
  const json = JSON.stringify(
    packs.map(({ pack }) => pack),
    null,
    2,
  )

  try {
    await fs.writeFile(path.join(builtPacksPath, "index.json"), json)
  } catch (err) {
    throw new Error(`Failed to write packs index`, { cause: err })
  }
}
