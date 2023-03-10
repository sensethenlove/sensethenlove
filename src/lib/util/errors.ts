export class CreateTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
} 

export class VerifyTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}


export class VerifyTokenExpiredError extends VerifyTokenError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}


export class VerifyTokenIDMismatchError extends VerifyTokenError {
  constructor() {
    super('VerifyTokenIDMismatchError')
    this.name = this.constructor.name
  }
}


export class RedirectError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}


export class IsFileAnImageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
