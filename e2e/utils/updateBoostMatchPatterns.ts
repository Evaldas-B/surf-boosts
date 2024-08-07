import type { Page } from "@playwright/test"

export default async function updateBoostMatchPatterns({
  page,
  boostName,
  matchPatterns,
}: {
  page: Page
  boostName: string
  matchPatterns: string[]
}) {
  // Navigate to boost page
  await page.getByText(boostName).click()

  const matchPatternsInput = page.getByLabel("Match Patterns")

  // Delete old match patterns
  for (let i = 0; i < 5; i++) {
    await matchPatternsInput.first().press("Backspace")
  }

  // Add new match patterns
  await Promise.all(
    matchPatterns.map(async (matchPattern) => {
      await matchPatternsInput.first().fill(matchPattern)
      await matchPatternsInput.first().press("Enter")
    }),
  )

  await page.getByTitle("Save boost").first().click()
}
