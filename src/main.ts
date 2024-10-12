import * as core from '@actions/core'
import { Platform } from './types'
import install_toolchain from './toolchain'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const platform: Platform = await core.platform.getDetails()
    const rust_toolchain: string = core.getInput('rust-toolchain', {
      trimWhitespace: true
    })

    // Execute toolchain function
    await install_toolchain(rust_toolchain, platform)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
