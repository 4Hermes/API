import { ObjectId, Document } from 'mongodb'

/**
 * This interface represents a Friend object in the `props` DB, under the
 * `friends` collection of my MongoDB Cluster.
 */
export interface IFriend extends Document {
  _id: ObjectId

  name?: string
  alias?: string
  number?: string
  lastContact?: string
}

export interface IFriend_INSERT {
  name: string
  alias?: string
  number: string
  lastContact: string
}
