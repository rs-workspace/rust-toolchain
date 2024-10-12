import { createWriteStream, type PathLike } from 'fs'
import * as http from 'http'
import { info } from '@actions/core'

export async function download_file(
  url: URL,
  path: PathLike
): Promise<void | never> {
  const file = createWriteStream(path)

  http
    .get(url, res => {
      res.pipe(file)

      file.on('finish', () => {
        file.close(() => {
          info(
            `File downloaded successfully from URL: ${url} to location: ${path}`
          )
        })
      })
    })
    .on('error', err => {
      throw err
    })
}
