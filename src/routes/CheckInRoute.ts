import { BaseRoute } from '../lib/index.js'
import { CheckInService } from '../services/index.js'

/**
 * This is the route class for the `/check-in` API route. The purpose of this
 * route is to provide a way to initiate a check-in for one of my close-friends
 * and/or family members.
 */
export class CheckInRoute extends BaseRoute {
  override async build() {
    const checkInService = new CheckInService(this.config)

    this.router.post('/check-in', ctx => checkInService.postMethod(ctx))

    return this.router
  }
}
