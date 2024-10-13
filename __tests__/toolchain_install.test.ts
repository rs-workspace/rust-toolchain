import * as exec from '@actions/exec'
import { download_file } from '../src/utils'
import install_toolchain from '../src/toolchain'
import { Platform, Properties } from '../src/types'

jest.mock('@actions/exec')
jest.mock('../src/utils')

const mockedExec = exec.exec as jest.MockedFunction<typeof exec.exec>
const mockedDownloadFile = download_file as jest.MockedFunction<
  typeof download_file
>

describe('install_toolchain', () => {
  let properties: Properties
  let platform: Platform

  beforeEach(() => {
    properties = new Properties('stable', 'minimal')

    platform = {
      name: 'Windows',
      platform: 'win32',
      arch: 'x64',
      version: '10.0',
      isWindows: false,
      isMacOS: false,
      isLinux: false
    }

    mockedExec.mockReset()
    mockedDownloadFile.mockReset()
  })

  test('should install Rust on Windows x64', async () => {
    platform.isWindows = true
    platform.arch = 'x64'

    await install_toolchain(properties, platform)

    expect(mockedDownloadFile).toHaveBeenCalledWith(
      new URL(
        'https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe'
      ),
      'rustup-init.exe'
    )

    expect(mockedExec).toHaveBeenCalledWith('./rustup-init.exe', [
      '-v',
      '--default-toolchain',
      'stable',
      '--profile',
      'minimal',
      '-y'
    ])

    expect(mockedExec).toHaveBeenCalledWith('rm', ['rustup-init.exe'])
  })

  test('should install Rust on Windows ia32', async () => {
    platform.isWindows = true
    platform.arch = 'ia32'

    await install_toolchain(properties, platform)

    expect(mockedDownloadFile).toHaveBeenCalledWith(
      new URL(
        'https://static.rust-lang.org/rustup/dist/i686-pc-windows-msvc/rustup-init.exe'
      ),
      'rustup-init.exe'
    )

    expect(mockedExec).toHaveBeenCalledWith('./rustup-init.exe', [
      '-v',
      '--default-toolchain',
      'stable',
      '--profile',
      'minimal',
      '-y'
    ])

    expect(mockedExec).toHaveBeenCalledWith('rm', ['rustup-init.exe'])
  })

  test('should throw an error for unsupported architecture on Windows', async () => {
    platform.isWindows = true
    platform.arch = 'unsupported_arch'

    await expect(install_toolchain(properties, platform)).rejects.toThrow(
      "Unsupported Platform Architecture unsupported_arch. Supported Architecture are 'x64' and 'ia32' for windows OS."
    )

    expect(mockedDownloadFile).not.toHaveBeenCalled()
    expect(mockedExec).not.toHaveBeenCalled()
  })

  test('should install Rust on non-Windows platform', async () => {
    platform.isWindows = false

    await install_toolchain(properties, platform)

    expect(mockedDownloadFile).not.toHaveBeenCalled()
    expect(mockedExec).toHaveBeenCalledWith('curl', [
      '--proto',
      'https',
      '--tlsv1.2',
      '-sSf',
      'https://sh.rustup.rs',
      '|',
      'sh',
      '-s',
      '--',
      '-v',
      '--default-toolchain',
      'stable',
      '--profile',
      'minimal',
      '-y'
    ])
  })

  test('should handle errors thrown by download_rust', async () => {
    platform.isWindows = true
    platform.arch = 'x64'

    mockedDownloadFile.mockRejectedValueOnce(new Error('Download failed'))

    await expect(install_toolchain(properties, platform)).rejects.toThrow(
      'Download failed'
    )

    expect(mockedDownloadFile).toHaveBeenCalledTimes(1)
  })
})
