import Joi from 'joi'

export const CheckInSchema = Joi.object({
  userId: Joi.string().alphanum().required(),
  friendId: Joi.string().alphanum().required(),
  lastCheckIn: Joi.string().optional(),
  prompt: Joi.string().optional(),
})

// export default CheckInSchema
