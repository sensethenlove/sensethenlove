export class ServerError extends Error {
  response: any


  constructor(error: any) {
    if (error?.message) super(error.message) // if error has a message => set error message
    else if (typeof error === 'string') super(error) // if error is a string => set error message
    else super('An error has occurred') // else => default error message

    if (typeof error === 'object') this.response = error // if error is an object => set response to this object
    else this.response = { _errors: [ this.message ] } // else => begin to format response

    if (!this.response._errors) this.response._errors = [ this.message ] // if response does not have an _errors array (error set above does not have an _errors array) => give it an _errors array

    this.name = this.constructor.name // set error name for easier error parsing
  }


  format () {
    return this.response // give formatted response
  }
}
