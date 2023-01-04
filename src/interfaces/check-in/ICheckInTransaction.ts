import { ObjectId } from 'mongodb'

/**
 * This interface defines the object that's stored in the `checkins` collection
 * in the `hermes` DB. It serves as a transaction record (of sorts) for all of
 * the Check-Ins performed by the users of Hermes.
 */
export interface ICheckInTransaction {
  /**
   * The ID of the Check-In object. It doesn't have to be provided on Check-In
   * as it'll automatically be generated upon creation.
   */
  _id: ObjectId

  /** The ID of the user who's requesting the Check-In. */
  userId: string

  /**
   * The ID of the Friend we're checking in on. The ID comes from the object
   * stored in the `friends` collection of the `hermes` DB.
   */
  friendId: string
}
