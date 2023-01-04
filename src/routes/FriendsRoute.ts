import { Successful } from '@4lch4/koa-oto'
import { RouterContext } from '@koa/router'
import { BaseRoute } from '../lib/index.js'

/**
 * This is the route class for the `/friends` API route. The purpose of this
 * route is to provide a way to create, read, update, and delete friends from my
 * config collection stored in my MongoDB Cluster.
 */
export class FriendsRoute extends BaseRoute {
  // private dbUtil: DBUtil = new DBUtil()

  /**
   * Handles the `GET` method for the `/friends` route. This method will return
   * a list of all friends from the config collection stored in my MongoDB
   * Cluster.
   *
   * @param ctx The {@link RouterContext} object.
   */
  async getMethod(ctx: RouterContext) {
    if (ctx.request.query.relatedFriend || ctx.request.body.relatedFriend) {
      const res = await this.dbUtil.getFriends(
        ctx.request.query.relatedFriend || ctx.request.body.relatedFriend
      )

      Successful.ok(ctx, res)
    } else {
      this.logger.info(
        '[FriendsRoute#getMethod]: No query provided, attempting to get all friends.'
      )

      const res = await this.dbUtil.getFriends()

      this.logger.info('[FriendsRoute#getMethod]: Successfully retrieved all friends.')

      Successful.ok(ctx, res)
    }

    this.logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
  }

  /**
   * Handles the `POST` method for the `/friends` route. This method will create
   * a new friend in the config collection stored in my MongoDB Cluster and
   * returns the result of the operation.
   *
   * @param ctx The {@link RouterContext} object.
   */
  async postMethod(ctx: RouterContext) {
    Successful.ok(ctx)

    this.logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
  }

  /**
   * Handles the `PATCH` method for the `/friends` route. This method will
   * update an existing friend in the config collection stored in my MongoDB
   * Cluster and returns the result of the operation.
   *
   * @param ctx The {@link RouterContext} object.
   */
  async patchMethod(ctx: RouterContext) {
    Successful.ok(ctx)

    this.logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
  }

  /**
   * Handles the `DELETE` method for the `/friends` route. This method will
   * delete an existing friend in the config collection stored in my MongoDB
   * Cluster and returns the result of the operation.
   *
   * @param ctx The {@link RouterContext} object.
   */
  async deleteMethod(ctx: RouterContext) {
    Successful.ok(ctx)

    this.logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
  }

  override async build() {
    this.router.get('/friends', ctx => this.getMethod(ctx))
    this.router.post('/friends', ctx => this.postMethod(ctx))
    this.router.patch('/friends', ctx => this.patchMethod(ctx))
    this.router.delete('/friends', ctx => this.deleteMethod(ctx))

    await this.dbUtil.connect()

    return this.router
  }
}
