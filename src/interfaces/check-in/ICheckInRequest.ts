import { getDefaultPrompt } from '../../lib/index.js' // Used for the JSDoc comment for the `prompt` property of the `ICheckInRequest` interface.

/** This interface represents the request body for the `/check-in` API route. */
export interface ICheckInRequest {
  /** The ID of the user who's requesting the Check-In. */
  userId: string

  /**
   * The ID of the Friend we're checking in on. The ID comes from the object
   * stored in the `friends` collection of the `hermes` DB.
   */
  friendId: string

  /**
   * The ID of the Check-In object (under the `hermes` DB and the `checkins`
   * collection) associated with the last time we checked in on this friend.
   */
  lastCheckIn?: string

  /**
   * An optional field to use as the prompt to the ChatGPT AI model. If this
   * field is not provided, the ChatGPT AI model will create a default prompt
   * using the {@link getDefaultPrompt} function in the `ChatGPT.ts` file. For
   * details on the default prompt, see the documentation for that function.
   */
  prompt?: string
}
