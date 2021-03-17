import { App } from '../types/app'

export class HttpError extends Error implements App.Error.HttpError {
  readonly status: number
  readonly timestamp: Date
  readonly errors: ReadonlyArray<string>

  constructor(
    message: string,
    status: number,
    errors: ReadonlyArray<string> = [],
  ) {
    super(message)

    this.status = status
    this.timestamp = new Date()
    this.errors = errors
  }
}
