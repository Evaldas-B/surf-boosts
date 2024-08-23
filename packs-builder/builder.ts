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
  const { packFiles, boostFiles, setupBoostFiles } = await readPacksRepoFiles()
  const boosts = await getBoostFilesWithContent(boostFiles)
  const setupBoosts = await getBoostFilesWithContent(setupBoostFiles)
  const packs = await getPackFilesWithContent(packFiles)
  await reCreatePacksDir()
  await writePacksIndex(packs)
  const boostsAndSetupBoosts = [...boosts, ...setupBoosts]
  const packsWithBoosts = groupBoostsWithPacks(packs, boostsAndSetupBoosts)
  await writePacks(packsWithBoosts)
  logTask(packsWithBoosts)
}

buildPacks()
