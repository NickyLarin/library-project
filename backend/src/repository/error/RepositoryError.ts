import { App } from '../../types/app'

export class RepositoryError
  extends Error
  implements App.Repository.Error.RepositoryError {
  readonly errors?: ReadonlyArray<string> | null

  constructor(message: string)
  constructor(message: string, errors?: ReadonlyArray<string>) {
    super(message)
    this.name = RepositoryError.name
    this.errors = errors ?? null
  }
}
