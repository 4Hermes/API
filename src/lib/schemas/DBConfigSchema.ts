import Joi from 'joi'

export const DBConfigCollectionDetailsSchema = Joi.object({
  dbName: Joi.string().required(),
  collectionName: Joi.string().required(),
})

export const DBConfigCollectionsSchema = Joi.object({
  config: DBConfigCollectionDetailsSchema,
  friends: DBConfigCollectionDetailsSchema,
  users: DBConfigCollectionDetailsSchema,
})

export const DBConfigSchema = Joi.object({
  connectionString: Joi.string().required(),
  collections: DBConfigCollectionsSchema,
})

// export const validateDBConfig = (config: any): Promise<Joi.ValidationResult<any>> => {
//   return DBConfigSchema.validateAsync(config)
// }
