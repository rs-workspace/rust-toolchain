import * as core from '@actions/core'
import { Platform, Properties } from './types'
import install_toolchain from './toolchain'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const platform: Platform = await core.platform.getDetails()
    const rust_toolchain: string = core.getInput('rust-toolchain', {
      trimWhitespace: true,
      required: true
    })
    const profile: string = core.getInput('profile', {
      trimWhitespace: true,
      required: true
    })

    const properties = new Properties(rust_toolchain, profile)
    properties.verify()

    // install rust toolchain
    await install_toolchain(properties, platform)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
