import * as exec from '@actions/exec'
import { Platform, Properties } from './types'
import { download_file } from './utils'

/**
 * Installs specified Rust Toolchain
 *
 * @param {string} rust_toolchain
 * @param {Platform} platform
 */
export default async function install_toolchain(
  properties: Properties,
  platform: Platform
): Promise<void | never> {
  try {
    // Download and install Rust for the current Platform
    await download_rust(properties, platform)
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

/**
 * Download and install Rust for the current Platform.
 *
 * @async
 * @param {Properties} properties installation properties
 * @param {Platform} platform
 * @returns {Promise<void | never>}
 */
async function download_rust(
  properties: Properties,
  platform: Platform
): Promise<void | never> {
  try {
    // Install the rustup-init installer for windows
    if (platform.isWindows) {
      if (platform.arch == 'x64') {
        // Install 64 bit installer from rust-lang.org
        await download_file(
          new URL(
            'https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe'
          ),
          'rustup-init.exe'
        )
      } else if (platform.arch == 'ia32') {
        // Install 32 bit installer from rust-lang.org
        await download_file(
          new URL(
            'https://static.rust-lang.org/rustup/dist/i686-pc-windows-msvc/rustup-init.exe'
          ),
          'rustup-init.exe'
        )
      } else {
        throw new Error(
          `Unsupported Platform Architecture '${platform.arch}'. Supported Architecture are 'x64' and 'ia32' for windows OS.`
        )
      }
    } else {
      // Download rust installation script
      await download_file(new URL('https://sh.rustup.rs'), 'rustup.sh')

      // Give Execute Permission to script
      await exec.exec('chmod +x ./rustup.sh')

      // Ensure the file system is synced
      await exec.exec('sync')
    }

    // Install rust
    await exec.exec(
      `${platform.isWindows ? './rustup-init.exe' : './rustup.sh'}`,
      [
        '-v',
        '--default-toolchain',
        properties.rust_toolchain,
        '--profile',
        properties.profile,
        '-y'
      ]
    )

    // Uninstall script or installer
    await exec.exec(
      `rm ${platform.isWindows ? './rustup-init.exe' : './rustup.sh'}`
    )
  } catch (error) {
    if (error instanceof Error) throw error
  }
}
