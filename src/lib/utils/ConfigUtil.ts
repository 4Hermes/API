import { IAppConfig, IDBConfig, IPackageJSON } from '../../interfaces/index.js'
import { BaseUtil, DEFAULT_API_PORT, IOUtil, UNKNOWN_VALUE } from '../index.js'

export class ConfigUtil extends BaseUtil {
  /**
   * An instance of the {@link IOUtil} class for reading the contents of the
   * [package.json][0] file in the root of the API repository.
   *
   * [0]: ../../../package.json
   */
  private ioUtil: IOUtil = new IOUtil()

  /**
   * Creates an object containing all the required configuration settings for
   * interacting with the MongoDB Cluster and its collections.
   *
   * @returns An object containing the configuration settings for the MongoDB Cluster.
   */
  public getDBConfig(): IDBConfig {
    return {
      connectionString: process.env.MONGODB_CONNECTION_STRING || UNKNOWN_VALUE,
      collections: {
        config: {
          collectionName: process.env.MONGODB_CONFIG_COLLECTION_NAME || UNKNOWN_VALUE,
          dbName: process.env.MONGODB_CONFIG_COLLECTION_DB_NAME || UNKNOWN_VALUE,
        },
        friends: {
          collectionName: process.env.MONGODB_FRIENDS_COLLECTION_NAME || UNKNOWN_VALUE,
          dbName: process.env.MONGODB_FRIENDS_COLLECTION_DB_NAME || UNKNOWN_VALUE,
        },
        users: {
          collectionName: process.env.MONGODB_USERS_COLLECTION_NAME || UNKNOWN_VALUE,
          dbName: process.env.MONGODB_USERS_COLLECTION_DB_NAME || UNKNOWN_VALUE,
        },
        checkIns: {
          collectionName: process.env.MONGODB_CHECK_INS_COLLECTION_NAME || UNKNOWN_VALUE,
          dbName: process.env.MONGODB_CHECK_INS_COLLECTION_DB_NAME || UNKNOWN_VALUE,
        },
      },
    }
  }

  /**
   * Creates an object containing all the required configuration settings for
   * the application to run. It's an async function since it needs to read the
   * `package.json` file to get the name and version of the application.
   *
   * @returns An object containing the configuration for the application.
   */
  public async getAppConfig(): Promise<IAppConfig> {
    const packageJSON: IPackageJSON = await this.ioUtil.getPackageJSON()

    return {
      apiPrefix: process.env.API_PREFIX || UNKNOWN_VALUE,
      apiToken: process.env.API_TOKEN || UNKNOWN_VALUE,
      name: packageJSON.name || UNKNOWN_VALUE,
      version: packageJSON.version || UNKNOWN_VALUE,
      port: Number(process.env.API_PORT) || DEFAULT_API_PORT,
      dbConfig: this.getDBConfig(),
      openAIAPIKey: process.env.OPENAI_API_KEY || UNKNOWN_VALUE,
    }
  }
}
