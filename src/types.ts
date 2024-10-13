import { debug } from '@actions/core'

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

export class Properties {
  rust_toolchain: string
  profile: string

  /**
   * Creates an instance of Properties.
   *
   * @constructor
   * @param {string} rust_toolchain
   * @param {string} profile
   */
  constructor(rust_toolchain: string, profile: string) {
    this.rust_toolchain = rust_toolchain
    this.profile = profile
  }

  /**
   * Verify if the properties are correct, throws an error when they aren't correct
   *
   * @returns {(void | never)}
   */
  verify(): void | never {
    if (
      this.profile == 'default' ||
      this.profile == 'minimal' ||
      this.profile == 'complete'
    )
      debug(`Received Correct 'profile' input -> ${this.profile}`)
    else
      throw new Error(
        `Profile can be ('default', 'minimal', or 'complete') but not '${this.profile}'`
      )

    if (
      this.rust_toolchain == 'stable' ||
      this.rust_toolchain == 'nightly' ||
      this.rust_toolchain == 'beta' ||
      this.rust_toolchain == 'none'
    )
      debug(`Received Correct 'rust-toolchain' input -> ${this.rust_toolchain}`)
    // Other rust_toolchain will be like `nightly-2024-10-12` which isn't needed to be verified here
    // as it can be verified when passed in installation
    else
      debug(
        `Receieved 'rust-toolchain' input -> ${this.rust_toolchain}. This input isn't verified and will be verified in installation process`
      )
  }
}
