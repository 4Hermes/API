import { logger } from '@4lch4/logger'
import { IAppConfig } from './interfaces/index.js'
import { ConfigUtil, DBUtil, ServerUtil } from './lib/index.js'
import { getRoutes } from './routes/index.js'

const init = async () => {
  try {
    // Create an instance of the ConfigUtil class.
    const configUtil = new ConfigUtil()

    // Get the application configuration.
    const config: IAppConfig = await configUtil.getAppConfig()

    // Create an instance of the DBUtil class.
    const dbUtil = new DBUtil(config)

    // Connect to the MongoDB Cluster.
    await dbUtil.connect()

    // Create a new server instance.
    const server = new ServerUtil(config)

    // Get the routes to add to the server.
    const routes = await getRoutes(config, dbUtil)

    // Add middleware, routes, and then return the result of the start() method.
    return server.addMiddleware().addRoutes(routes).start()
  } catch (error) {
    throw error
  }
}

init()
  .then(() => {
    logger.success('[index#init:then]: Server has successfully come online!')
  })
  .catch(err => {
    logger.error('[index#init:catch]: main() failed!')
    logger.error(err)
  })
