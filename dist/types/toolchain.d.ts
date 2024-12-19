import { Platform, Properties } from './types';
/**
 * Installs specified Rust Toolchain
 *
 * @param {string} rust_toolchain
 * @param {Platform} platform
 */
export default function install_toolchain(properties: Properties, platform: Platform): Promise<void | never>;
