import { ERROR_MESSAGE } from '$lib/turnstile/variables'
import { validateResponse } from '$lib/turnstile/validateResponse'


export default async function validate (request: Request, schema: any) {
  let error: any
  let fields = Object.fromEntries((await request.formData()).entries())

  const validationResponse = schema.safeParse(fields)

  if (!validationResponse.success) error = validationResponse.error.format()
  else if (!fields['cf-turnstile-response']) error = { _errors: [ERROR_MESSAGE] }
  else {
    const { success } = await validateResponse(fields['cf-turnstile-response'])
    if (!success) error = { _errors: [ERROR_MESSAGE] }
  }

  return { error, fields }
}
