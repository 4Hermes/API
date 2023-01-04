/**
 * Creates the log message to be displayed when the server is starting.
 *
 * @param port The port number the server is listening on.
 *
 * @returns A string to be logged.
 */
export const StartingMessage = (port: number) => {
  return `[Server#addMiddleware]: Starting server and listening on port ${port}...`
}

/**
 * Creates the log message to be displayed when the server has finished
 * starting.
 *
 * @param name The name of the API/App.
 * @param version The version of the API/App.
 *
 * @returns A string to be logged.
 */
export const StartedMessage = (name: string, version: string) => {
  return `[Server#start]: ${name}:v${version} has come online!`
}

/**
 * Creates the log message to be displayed when the server is adding the
 * expected middleware to the server.
 *
 * @returns A string to be logged.
 */
export const AddingMiddlewareMessage = () => {
  return '[Server#addMiddleware]: Adding middleware to server...'
}

/**
 * Creates the log message to be displayed when the server is adding/registering
 * the routes to the server.
 *
 * @param count The number of routes to be added to the server.
 *
 * @returns A string to be logged.
 */
export const AddingRoutesMessage = (count: number = 0) => {
  return `[Server#addRoutes]: Adding ${count} routes to server...`
}
