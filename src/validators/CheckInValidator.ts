import { RouterContext } from '@koa/router'
import { BaseValidator, CheckInSchema } from '../lib/index.js'
import { ValidationResult } from 'joi'

export class CheckInValidator extends BaseValidator {
  public validateRequestBody(ctx: RouterContext): ValidationResult {
    try {
      return CheckInSchema.validate(ctx.request.body)
    } catch (error) {
      throw error
    }
  }

  async build() {
    this.joi.object({})
    return this
  }
}
