import Joi from 'joi'
// import { DBConfigSchema } from './index.js'
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

export const AppConfigSchema = Joi.object({
  apiPrefix: Joi.string().required(),
  apiToken: Joi.string().required(),
  name: Joi.string().required(),
  version: Joi.string().required(),
  port: Joi.number().required(),
  dbConfig: DBConfigSchema,
})

// export const validateAppConfig = (config: any): Promise<Joi.ValidationResult<any>> => {
//   return AppConfigSchema.validateAsync(config)
// }
