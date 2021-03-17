import { HttpError } from './HttpError'

export class BadRequestError extends HttpError {
  constructor(errors: ReadonlyArray<string>) {
    super('Bad request', 400, errors)
  }
}
