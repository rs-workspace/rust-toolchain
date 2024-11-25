import * as core from '@actions/core'
import { Platform, Properties } from './types'
import install_toolchain from './toolchain'
import { exec } from '@actions/exec'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const platform: Platform = await core.platform.getDetails()

    const rust_toolchain: string = core.getInput('toolchain', {
      trimWhitespace: true,
      required: true
    })
    const profile: string = core.getInput('profile', {
      trimWhitespace: true,
      required: true
    })
    const components: string = core.getInput('components', {
      trimWhitespace: true
    })

    const properties = new Properties(rust_toolchain, profile, components)
    properties.verify()

    // install rust toolchain
    await install_toolchain(properties, platform)

    // Sumarize installation with tool versions
    let rustc_version = ''
    let rustup_version = ''

    await exec('rustc', ['--version'], {
      listeners: {
        stdout: (data: Buffer) => {
          rustc_version += data.toString()
        }
      }
    })

    await exec('rustup', ['--version'], {
      listeners: {
        stdout: (data: Buffer) => {
          rustup_version += data.toString()
        }
      }
    })

    // Create a Table Summary
    const version_info = [
      [
        { data: 'Tool', header: true },
        { data: 'Version', header: true }
      ],
      ['rustc', rustc_version],
      ['rustup', rustup_version]
    ]

    core.summary.addTable(version_info).write()
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
