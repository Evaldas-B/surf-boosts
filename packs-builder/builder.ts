import {
  groupBoostsWithPacks,
  logTask,
  readPacksRepoFiles,
  reCreatePacksDir,
  writePacks,
  writePacksIndex,
} from "./builderIO"
import { getBoostFilesWithContent, getPackFilesWithContent } from "./utils"

async function buildPacks() {
  const { packFiles, boostFiles } = await readPacksRepoFiles()
  const boostsFilesWithContent = await getBoostFilesWithContent(boostFiles)
  const packFilesWithContent = await getPackFilesWithContent(packFiles)

  await reCreatePacksDir()
  await writePacksIndex(packFilesWithContent)
  const packsWithBoosts = groupBoostsWithPacks(
    packFilesWithContent,
    boostsFilesWithContent,
  )
  await writePacks(packsWithBoosts)
  logTask(packsWithBoosts)
}

buildPacks()
