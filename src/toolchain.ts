import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { Platform } from './types'
import { download_file } from './utils'

/**
 * Installs specified Rust Toolchain
 *
 * @param {string} rust_toolchain
 * @param {Platform} platform
 */
export default async function install_toolchain(
  rust_toolchain: string,
  platform: Platform
): Promise<void | never> {
  try {
    // Download and install Rust for the current Platform if rust isn't installed on the OS.
    await download_rust(platform)

    switch (rust_toolchain) {
      case '':
      // Install rust without any default version
    }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

/**
 * Download and install Rust for the current Platform if rust isn't installed on the OS.
 *
 * @async
 * @param {Platform} platform
 * @returns {Promise<void | never>}
 */
async function download_rust(platform: Platform): Promise<void | never> {
  try {
    // TODO: Check if rust is already installed and skip this process
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
          `Unsupported Platform Architecture ${platform.arch}. Supported Architecture
             are 'x64' and 'ia32' for windows OS.`
        )
      }

      // Now install rust via installer
      // TODO: Ask User for the profile to be installed
      await exec.exec(
        './rustup-init.exe -v --default-toolchain none --profile minimal -y'
      )
    } else {
      // Install installer via direct script and download rust
      // TODO: Ask User for the profile to be installed
      await exec.exec(
        `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -v --default-toolchain none --profile minimal -y`
      )
    }
  } catch (error) {
    if (error instanceof Error) throw error
  }
}
