import { HttpError } from './HttpError'

export class NotFoundError extends HttpError {
  constructor(errors?: ReadonlyArray<string>) {
    super('Not found', 404, errors)
  }
}
