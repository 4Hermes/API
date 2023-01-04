import fs from 'fs-extra'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { IPackageJSON } from '../../interfaces/index.js'
import { BaseUtil } from '../index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * This class is a utility class that provides methods/functions to help
 * simplify interacting with the filesystem.
 */
export class IOUtil extends BaseUtil {
  /**
   * Reads the `package.json` file in the root of the package and returns the
   * content as an {@link IPackageJSON} JSON object.
   *
   * @returns The content of the `package.json` file as a JSON object.
   */
  public async getPackageJSON(): Promise<IPackageJSON> {
    try {
      const packageJsonPath = join(__dirname, '..', '..', '..', 'package.json')

      this.logger.debug(`[IOUtil#readPackageJSON]: Reading package.json from ${packageJsonPath}...`)

      return fs.readJSON(packageJsonPath)
    } catch (error) {
      throw error
    }
  }
}
