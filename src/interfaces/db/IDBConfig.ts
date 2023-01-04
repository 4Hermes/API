import { IDBCollections } from './index.js'

export interface IDBConfig {
  /**
   * This string is what will be used by the MongoDB driver to connect to the
   * cluster.
   */
  connectionString: string

  /**
   * This property contains a key-value pair where the key is the name of the
   * collection and the value is an object containing the details of the
   * collection. All of the collections in this property are used by the at
   * some point in the lifecycle of the application.
   */
  collections: IDBCollections
}
