/**
 * The entrypoint for the action.
 */
import { run } from './main'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()

export * from './main'
export * as toolchain from './toolchain'
export * as utils from './utils'
export * as types from './types'
