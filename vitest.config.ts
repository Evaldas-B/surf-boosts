import { defineConfig } from "vitest/config"
import { WxtVitest } from "wxt/testing"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    mockReset: true,
    restoreMocks: true,
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },

  plugins: [WxtVitest()],
})
