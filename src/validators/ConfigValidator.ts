import { RouterContext } from '@koa/router'
import Joi from 'joi'
import { IAppConfig } from '../interfaces/index.js'

export class ConfigValidator {
  public async validateRequestBody(ctx: RouterContext): Promise<any> {
    try {
      const tmp = Joi.object({
        userId: Joi.string().alphanum().required(),
      })

      return tmp.validate(ctx.request.body)
    } catch (error) {
      throw error
    }
  }

  public validate(config: IAppConfig) {
    const configObjectSchema = Joi.object({
      apiPrefix: Joi.string().required(),
      apiToken: Joi.string().required(),
      name: Joi.string().required(),
      version: Joi.string().required(),
      port: Joi.number().required(),
      dbConfig: Joi.object({}),
    })

    return configObjectSchema.validate(config)
  }

  async build() {
    return this
  }
}
