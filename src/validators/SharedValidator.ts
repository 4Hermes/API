import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { ICheckInRequest } from '../interfaces/index.js'

/**
 * This constant is the amount of characters in an ObjectID if it's displayed as
 * a string.
 */
export const USER_ID_LENGTH = 24

/**
 * This constant is a Joi schema for the `userId` field to ensure it's of the
 * right length (`24`) to be a MongoDB {@link ObjectId}.
 */
export const USER_ID_VALIDATOR = Joi.string()
  .alphanum()
  .case('lower')
  .length(USER_ID_LENGTH)
  .required()

const cirSchema = Joi.object<ICheckInRequest>({
  userId: Joi.string().alphanum().length(24).required(),
  friendId: Joi.string().alphanum().length(24).required(),
  lastCheckIn: Joi.string().optional()
})

const sampleBody: ICheckInRequest = {
  userId: '63ab4a2a8353e19cd730b525',
  friendId: '63ab4a738353e19cd730b527'
}

async function main() {
  try {
    const validateRes = cirSchema.validate(sampleBody)

    return validateRes
  } catch (error) {
    throw error
  }
}

main().then().catch()
