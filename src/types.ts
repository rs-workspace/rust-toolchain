// Return Type of `core.platform.getDetails()`
export interface Platform {
  name: string
  platform: string
  arch: string
  version: string
  isWindows: boolean
  isMacOS: boolean
  isLinux: boolean
}
