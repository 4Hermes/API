import { ClientErrors, Successful } from '@4lch4/koa-oto'
import { RouterContext } from '@koa/router'
import Dayjs from 'dayjs'
import { ObjectId } from 'mongodb'
import { ICheckInRequest } from '../interfaces/index.js'
import {
  BaseService,
  CheckInSchema,
  OpenAIUtil,
  DBUtil,
  LATEST_CONTACT_FORMAT,
  UNKNOWN_VALUE,
} from '../lib/index.js'

export class CheckInService extends BaseService {
  async postMethod(ctx: RouterContext): Promise<void> {
    // const userId = this.getRequestValue(ctx, 'userId')
    // const friendId = this.getRequestValue(ctx, 'friendId')

    const validationRes = CheckInSchema.validate(ctx.request.body)

    this.logger.info(`[CheckInRoute#postMethod]: Validated checkInRequest w/ Joi...`)
    this.logger.info(JSON.stringify(validationRes, null, 2))

    if (validationRes.error?.details) ClientErrors.badRequest(ctx, validationRes.error.details)
    else {
      const checkInRequest: ICheckInRequest = {
        userId: this.getRequestValue(ctx, 'userId'),
        friendId: this.getRequestValue(ctx, 'friendId'),
        lastCheckIn: this.getRequestValue(
          ctx,
          'lastCheckIn',
          Dayjs().format(LATEST_CONTACT_FORMAT)
        ),
        prompt: ctx.request.body.prompt || undefined,
      }

      const dbUtil = new DBUtil(this.config)

      await dbUtil.connect()

      const friend = await dbUtil.getFriend({
        _id: new ObjectId(checkInRequest.friendId),
        relatedFriend: new ObjectId(checkInRequest.userId),
      })

      this.logger.info(`[CheckInRoute#postMethod]: friend = ${JSON.stringify(friend, null, 2)}`)

      const openAIUtil = new OpenAIUtil(this.config)

      const generatedMessage = await openAIUtil.getGeneratedMessage(
        friend?.name || UNKNOWN_VALUE,
        checkInRequest.prompt
      )

      Successful.ok(ctx, { generatedMessage })

      this.logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)

      this.logger.info(
        `[CheckInRoute#getMethod]: checkInRequest = ${JSON.stringify(checkInRequest, null, 2)}`
      )
    }
  }

  override async build(): Promise<this> {
    return this
  }
}
