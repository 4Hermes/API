/**
 * This interface defines an object that contains the details of a MongoDB
 * collection stored in an inner-database.
 */
export interface IDBCollectionDetails {
  /** This string is the name of the DB where the collection can be found. */
  dbName: string

  /** This string is the name of the collection. */
  collectionName: string
}
