import { type PathLike } from 'fs';
/**
 * Download file from internet
 *
 * @export
 * @async
 * @param {URL} url URL of the file
 * @param {PathLike} path Path where file will be saved
 * @returns {Promise<void | never>}
 */
export declare function download_file(url: URL, path: PathLike): Promise<void | never>;
/**
 * Sleeps for the said amount of time (in ms)
 *
 * @export
 * @async
 * @param {number} ms Time in milliseconds for the delay
 * @returns {void}
 */
export declare function delay(ms: number): Promise<void>;
