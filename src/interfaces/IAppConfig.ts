import { IDBConfig } from './index.js'

export interface IAppConfig {
  /** The string to prepend before all routes (default: `/api/v1`). */
  apiPrefix: string

  /** The token to use for authenticating requests to the API. */
  apiToken: string

  /** The name of the API/App. */
  name: string

  /** The version of the API/App. */
  version: string

  /** The port to listen on (default: 5050). */
  port: number

  /** The configuration for the database. */
  dbConfig: IDBConfig

  /** The API key for requests to the OpenAI API. */
  openAIAPIKey: string
}
