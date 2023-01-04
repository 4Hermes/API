import { logger } from '@4lch4/logger'
import { IAppConfig } from '../../interfaces/index.js'
import { RouterContext } from '@koa/router'
import { UNKNOWN_VALUE } from '../index.js'

/**
 * This class is the base class for all of my Service classes. It provides a
 * common interface for all of them to extend.
 */
export class BaseService {
  protected logger = logger

  public constructor(protected config: IAppConfig) {}

  /**
   * Attempts to retrieve a user provided value from the request body, query
   * string, or headers. If the value is not found, it will return the provided
   * default value or `UNKNOWN_VALUE`.
   *
   * _NOTE: To access nested values, use dot notation, such as `user.name`._
   *
   * @param ctx The Koa Router Context for the request.
   * @param key The key you want the value of.
   * @param defaultValue An optional default value to return if the key is not found.
   *
   * @returns Either the value of the key or `UNKNOWN_VALUE`.
   */
  protected getRequestValue(ctx: RouterContext, key: string, defaultValue?: any): string {
    return (
      ctx.request.body[key] ||
      ctx.request.query[key] ||
      ctx.request.headers[key] ||
      defaultValue ||
      UNKNOWN_VALUE
    )
  }

  async build(): Promise<this> {
    return this
  }
}
