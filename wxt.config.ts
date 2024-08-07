import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  extensionApi: "chrome",
  manifest: {
    host_permissions: ["<all_urls>"],
    permissions: ["storage", "tabs", "scripting"],
  },
})
