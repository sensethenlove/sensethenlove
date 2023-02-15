import type { FormFields } from '$lib/util/types'
import { ERROR_MESSAGE } from '$lib/turnstile/variables'
import validateTurnstile from '$lib/turnstile/validateTurnstile'


export default async function (fields: FormFields, schema: any) {
  schema.parse(fields)

  if (!fields['cf-turnstile-response']) throw new Error(ERROR_MESSAGE)
  else await validateTurnstile(fields['cf-turnstile-response'])
}
