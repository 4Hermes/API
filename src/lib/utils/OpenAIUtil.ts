import Dayjs from 'dayjs'
import fs from 'fs-extra'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { IAppConfig } from '../../interfaces/index.js'
import { BaseUtil, DEFAULT_MODEL, getDefaultPrompt } from '../index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export class OpenAIUtil extends BaseUtil {
  private openAI: OpenAIApi

  public constructor(config: IAppConfig) {
    super()

    this.openAI = new OpenAIApi(new Configuration({ apiKey: config.openAIAPIKey }))
  }

  // public getCheckInPrompt(recipientName: string): string {
  //   return `
  //     Would you please write a message from me, Devin, to my close friend ${recipientName} checking in on them?
  //     I would like to know how they've been doing, if any major events have happened lately, and if they have
  //     anything they'd like to discuss next time we talk.
  //   `
  // }

  private async saveResponseToFile(res: CreateCompletionResponse): Promise<void> {
    const fileName = `OpenAIResponse-${Dayjs().format('YYYY-MM-DDTHH.mm.ss')}.json`
    const filePath = join(__dirname, '..', '..', '..', 'out', fileName)

    await fs.ensureFile(filePath)

    this.logger.debug(`[OpenAIUtil#saveResponseToFile]: Saving response to ${fileName}`)

    return fs.writeJSON(filePath, res, { spaces: 2 })
  }

  public async getGeneratedMessage(
    recipientName: string,
    prompt?: string
  ): Promise<string> {
    try {
      const openAIResponse = await this.openAI.createCompletion({
        model: DEFAULT_MODEL,
        prompt: prompt || getDefaultPrompt(recipientName),
        temperature: 0.7,
        max_tokens: 100,
      })

      if (openAIResponse.status.toString().startsWith('2')) {
        await this.saveResponseToFile(openAIResponse.data)

        this.logger.debug(
          `[OpenAIUtil#getCheckInCompletion]: Response: ${JSON.stringify(
            openAIResponse.data.choices[0],
            null,
            2
          )}`
        )

        return openAIResponse.data.choices[0].text || 'No response from OpenAI'
      } else return openAIResponse.statusText
    } catch (error) {
      throw error
    }
  }
}
