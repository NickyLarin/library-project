import { HttpError } from './HttpError'

export class NotFoundError extends HttpError {
  constructor() {
    super('Not found', 404)
  }
}
