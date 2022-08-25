import { Exception } from '../../../../domain/exceptions/Exception'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HandlerError {
  static run (error: any): Error {
    if (error instanceof Exception) {
      return new Error(error.message)
    }

    return error
  }
}
