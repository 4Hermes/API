import { IDBCollections } from '../../interfaces/index.js'

/** The name of the DB where Hermes stores application data. */
export const MONGODB_DB_NAME = 'hermes'

/** The name of the collection where Hermes stores friends data. */
export const MONGODB_FRIENDS_COLLECTION_NAME = 'friends'

/** The name of the collection where Hermes stores user data. */
export const MONGODB_USERS_COLLECTION_NAME = 'users'

/**
 * This object contains the details of the various MongoDB collections used by
 * the application. The properties are structured based on the DB they're
 * stored in.
 */
export const MONGODB_COLLECTIONS: IDBCollections = {
  config: {
    collectionName: 'config',
    dbName: MONGODB_DB_NAME,
  },
  friends: {
    collectionName: 'friends',
    dbName: MONGODB_DB_NAME,
  },
  users: {
    collectionName: 'users',
    dbName: MONGODB_DB_NAME,
  },
  checkIns: {
    collectionName: 'check-ins',
    dbName: MONGODB_DB_NAME,
  }
}
