/**
 * Creates a prompt to use as the default prompt for the ChatGPT AI model. It'll
 * prompt ChatGPT to do something like so:
 *
 * ```text
 * Write a message from me, ${username}, to my friend, ${friendName}, where I'm
 * checking in on them to see how they've been doing since we last spoke on
 * ${lastContactDate}.
 * ```
 *
 * If the `lastContactDate` is provided, we add that we last spoke on the
 * specified date, like so:
 *
 * ```text
 * Write a message from me, ${username}, to my friend, ${friendName}, where I'm
 * checking in on them to see how they've been doing since we last spoke on
 * ${lastContactDate}.
 * ```
 *
 * @param friendName The name of the friend we're checking in on.
 * @param lastContactDate The date of the last time we checked in on this friend, if we have it.
 *
 * @returns A string to use as the prompt for the ChatGPT AI model.
 */
export function getDefaultPrompt(friendName: string): string {
  return `
  Please write a message from me, Devin/4lch4, to my friend, ${friendName}, where I'm
  checking in on them to see how they've been doing.
`
}

/** The default model to use for the OpenAI GPT3 API. */
export const DEFAULT_MODEL = 'text-davinci-003'
