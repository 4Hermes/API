import Dayjs from 'dayjs'
import { Request } from 'koa'

/**
 * The format to use with Dayjs for formatting the `lastContact` property of a
 * Check-In.
 */
export const LATEST_CONTACT_FORMAT = 'YYYY-MM-DDTHH:mm:ssZZ[Z]'

/**
 * Returns the value of the `lastContact` property for a given Check-In request.
 * 
 *
 * @returns A string to use as the lastContact value of a check-in.
 */
export const getLastContactDate = (request: Request) => {
  return request.query.lastContact ||
    request.body.lastContact ||
    Dayjs().format(LATEST_CONTACT_FORMAT)
}
