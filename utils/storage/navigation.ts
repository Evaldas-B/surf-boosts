import { storage } from "wxt/storage"

export type Navigation =
  | { path: "/" }
  | { path: "/boost"; props: { boostId: string } }
  | { path: "/boost-pack"; props: { boostPackId: string } }
  | { path: "/boosts-repo" }
  | { path: "/remote-boost-pack"; props: { boostPackUrl: string } }

export type ExtractNavigationProps<P extends Navigation["path"]> =
  Navigation & { path: P }

export default storage.defineItem<Navigation>("local:NAVIGATION", {
  defaultValue: { path: "/" },
})
