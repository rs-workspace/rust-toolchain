import { createWriteStream, type PathLike } from 'fs'
import * as http from 'http'
import * as https from 'https'
import { info } from '@actions/core'

/**
 * Download file from internet
 *
 * @export
 * @async
 * @param {URL} url URL of the file
 * @param {PathLike} path Path where file will be saved
 * @returns {Promise<void | never>}
 */
export async function download_file(
  url: URL,
  path: PathLike
): Promise<void | never> {
  const file = createWriteStream(path)

  // Choose the appropriate module based on the URL protocol
  const client = url.protocol === 'https:' ? https : http

  client
    .get(url, res => {
      res.pipe(file)

      file.on('finish', () => {
        file.close(() => {
          info(
            `File downloaded successfully from URL: ${url} to location: ${path}`
          )
        })
      })

      // Handle HTTP errors
      res.on('error', err => {
        throw err
      })
    })
    .on('error', err => {
      throw err
    })
}
