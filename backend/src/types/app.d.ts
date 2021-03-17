import { NextFunction, Request, Response } from 'express'
import { NamingStrategyNotFoundError } from 'typeorm'
import { Author } from '../entity/Author'
import { Book } from '../entity/Book'
import { LogLevel } from '../enum/log-level'

export declare namespace App {
  namespace Config {
    interface Service {
      readonly port: number
      readonly logLevel: LogLevel
    }
  }

  namespace Error {
    interface HttpError {
      readonly message: string
      readonly status: number
      readonly timestamp: Date
      readonly errors: ReadonlyArray<string>
    }

    interface Body {
      readonly message: string
      readonly status: number
      readonly timestamp: string
      readonly method: string
      readonly path: string
      readonly errors: ReadonlyArray<string>
    }
  }

  namespace Book {
    namespace Create {
      interface Body {
        title: string
        year: number
        authors: Array<Author.Create.Body>
      }
    }
  }

  namespace Author {
    namespace Create {
      interface Body {
        name: string
      }
    }
  }

  namespace Logger {
    interface Service {
      log(level: LogLevel, msg: string): void
      error(msg: string): void
      warn(msg: string): void
      info(msg: string): void
      http(msg: string): void
      verbose(msg: string): void
      debug(msg: string): void
      silly(msg: string): void
    }
  }

  type Action = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>

  namespace Controller {
    interface BaseController {
      all: Action
      one: Action
      save: Action
    }
    interface BookController extends BaseController {}
  }

  interface Route {
    method: string
    route: string
    controller: App.Controller.BaseController
    action: App.Action
  }
}
