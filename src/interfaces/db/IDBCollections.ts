import { IDBCollectionDetails } from './index.js'

/**
 * This interface defines the object that contains information on the various
 * MongoDB Collections (and the database they're stored within) that are used by
 * the application.
 */
export interface IDBCollections {
  /**
   * This property contains the details of the `config` collection which is
   * where I store any application configuration data that isn't for a specific
   * user.
   */
  config: IDBCollectionDetails

  /**
   * This property contains the details of the `friends` collection which is
   * where I store the details of friends that users of the application have
   * added.
   */
  friends: IDBCollectionDetails

  /**
   * This property contains the details of the `users` collection which is where
   * I store the details of users of the application.
   */
  users: IDBCollectionDetails

  /**
   * This property contains the details of the `check-ins` collection which is
   * where I store all of the past check-ins that have occurred.
   */
  checkIns: IDBCollectionDetails
}
