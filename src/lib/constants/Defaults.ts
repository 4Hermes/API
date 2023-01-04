import { IAppConfig, IDBConfig } from '../../interfaces/index.js'
import { MONGODB_COLLECTIONS } from './MongoDB.js'

/** The default prefix to use for API routes. */
export const DEFAULT_API_PREFIX = '/api/v1'

/**
 * The default token to use for requests, should be overwrote with an env
 * variable (`API_TOKEN`).
 */
export const DEFAULT_API_TOKEN = '1234567890'

/** The default port the API should listen on. */
export const DEFAULT_API_PORT = 5050

/** The default name of the API. */
export const DEFAULT_API_NAME = '@4lch4/hermes-api'

/** The default version of the API. */
export const DEFAULT_API_VERSION = '0.0.0'

/**
 * The default value to use for unknown values (e.g. a function called without
 * providing its parameters, use this for those parameter values).
 */
export const UNKNOWN_VALUE = 'Unknown'

/** The default name of the Hermes DB. */
export const DEFAULT_DB_NAME = 'hermes'

/**
 * An object containing all of the default values to use for the
 * {@link IDBConfig dbConfig} object.
 */
export const DEFAULT_DB_CONFIG: IDBConfig = {
  connectionString: UNKNOWN_VALUE,
  collections: MONGODB_COLLECTIONS,
}

/**
 * An object containing all of the default values to use for the
 * {@link IAppConfig appConfig} object.
 */
export const DEFAULT_APP_CONFIG: IAppConfig = {
  apiPrefix: DEFAULT_API_PREFIX,
  apiToken: DEFAULT_API_TOKEN,
  name: DEFAULT_API_NAME,
  version: DEFAULT_API_VERSION,
  port: DEFAULT_API_PORT,
  dbConfig: DEFAULT_DB_CONFIG,
  openAIAPIKey: UNKNOWN_VALUE,
}
