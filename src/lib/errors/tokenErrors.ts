import { VerifyTokenError } from '@sensethenlove/jwt'


export class VerifyTokenIDMismatchError extends VerifyTokenError {
  constructor() {
    super('VerifyTokenIDMismatchError')
    this.name = this.constructor.name
  }
}
