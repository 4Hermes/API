import Router from '@koa/router'
import { IAppConfig } from '../interfaces/index.js'
import { CheckInRoute } from './CheckInRoute.js'
import { HealthRoute } from './HealthRoute.js'
import { FriendsRoute } from './FriendsRoute.js'
import { DBUtil } from '../lib/utils/DBUtil.js'

const Endpoints = [CheckInRoute, HealthRoute, FriendsRoute]

/**
 * Creates and returns an array of {@link Router} objects that are to be used
 * by the server.
 *
 * @returns An array of {@link Router} instances that represent the routes to add to the API.
 */
export async function getRoutes(config: IAppConfig, dbUtil: DBUtil): Promise<Router[]> {
  // Instantiate an array of routers.
  const routes: Router[] = []

  // Loop through the endpoints and instantiate them.
  for (const Endpoint of Endpoints) {
    const endpoint = new Endpoint(config, dbUtil)

    routes.push(await endpoint.build())
  }

  // Return the array of routers.
  return routes
}
