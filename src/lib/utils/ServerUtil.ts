import { printRoutes } from '@4lch4/koa-router-printer'
import { logger } from '@4lch4/logger'
import Router from '@koa/router'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import Helmet from 'koa-helmet'
import { IAppConfig } from '../../interfaces/index.js'
import {
  AddingMiddlewareMessage,
  AddingRoutesMessage,
  StartedMessage,
  StartingMessage,
} from '../index.js'

export class ServerUtil {
  private app: Koa

  public constructor(private config: IAppConfig) {
    this.app = new Koa()
  }

  /**
   * Begins listening on the port specified in the app config. If it
   * successfully starts, it will log a message to the console like so:
   *
   * `[Server#start]: @4lch4/hermes-api:v0.0.0 has come online!`
   *
   * @returns {ServerUtil} The instance of the ServerUtil class.
   */
  public start(): ServerUtil {
    logger.debug(StartingMessage(this.config.port))

    this.app.listen(this.config.port, () => {
      logger.debug(StartedMessage(this.config.name, this.config.version))
    })

    return this // For method chaining
  }

  /**
   * Adds the expected middleware to the server, such as koa-body and
   * koa-helmet.
   *
   * @returns {ServerUtil} The instance of the ServerUtil class.
   */
  public addMiddleware(): ServerUtil {
    logger.debug(AddingMiddlewareMessage)

    this.app.use(koaBody())
    this.app.use(Helmet())

    return this // For method chaining
  }

  /**
   * Iterates over each of the routes provided and registers them with the
   * server. Once all routes have been registered, it will print the routes
   * to the console using the [@4lch4/koa-router-printer][0] package.
   *
   * [0]: https://www.npmjs.com/package/@4lch4/koa-router-printer
   *
   * @param routes The routes (an array of type {@link Router}) to register with the server.
   *
   * @returns {ServerUtil} The instance of the ServerUtil class.
   */
  public addRoutes(routes: Router[]): ServerUtil {
    logger.debug(AddingRoutesMessage(routes.length))

    for (const route of routes) {
      this.app.use(route.routes())
      this.app.use(route.allowedMethods())
    }

    printRoutes(this.app, {
      displayHead: false,
      displayPrefix: true,
    })

    return this // For method chaining
  }
}
