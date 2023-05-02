import { ServerError } from '$lib/errors/serverError'


export class RedirectError extends ServerError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
